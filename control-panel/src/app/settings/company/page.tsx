'use client';
import { CompanyResponse } from '@/services/settings/company/dto/CompanyResponse';
import { UpdateCompanyRequest } from '@/services/settings/company/dto/UpdateCompanyRequest';
import { getCompany } from '@/services/settings/company/GetCompany';
import { updateCompany } from '@/services/settings/company/UpdateCompany';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import InputField from '../component/company/InputField';
import ActionButtons from '../component/company/ActionButtons';
import GlobalError from '../component/GlobalError';
import GlobalSuccess from '../component/GlobalSuccess';


const companyValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().min(10, 'Must be at least 10 characters long').required('Phone number is required'),
    website: Yup.string().url('Invalid website URL').required('Website is required'),
    address: Yup.string().optional(),
});

export default function CompanySettingsPage() {
    const [companyData, setCompanyData] = useState<CompanyResponse['data'] | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState<UpdateCompanyRequest>({
        name: '',
        email: '',
        phoneNumber: '',
        website: '',
        address: '',
    });

    // State for global error and success messages
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const data = await getCompany();
                setCompanyData(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    website: data.website,
                    address: data.address,
                });
            } catch (error) {
                console.error('Error fetching company data', error);
                setGlobalError('Failed to fetch company data.');
            }
        };

        fetchCompanyData();
    }, []);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        try {
            await companyValidationSchema.validateAt(name, { [name]: value });
            setErrors((prevErrors: any) => ({ ...prevErrors, [name]: undefined }));
        } catch (validationError) {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                [name]: validationError.message,
            }));
        }
    };

    const validateForm = async () => {
        try {
            await companyValidationSchema.validate(formData, { abortEarly: false });
            return {};
        } catch (validationError) {
            const errors: any = {};
            validationError.inner.forEach((err: Yup.ValidationError) => {
                errors[err.path] = err.message;
            });
            return errors;
        }
    };

    const handleSave = async () => {
        const formErrors = await validateForm();

        if (Object.keys(formErrors).length === 0) {
            try {
                await updateCompany(formData);
                setSuccessMessage('Company settings updated successfully');
                setCompanyData((prevCompanyData) => ({
                    ...prevCompanyData,
                    ...formData,
                }));
                setIsEditing(false);
                setErrors({});
                setGlobalError(null); // Clear any existing errors
            } catch (error) {
                console.error(error);
                setGlobalError('Failed to update company settings.');
                setSuccessMessage(null); // Clear any existing success messages
            }
        } else {
            setErrors(formErrors);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSave();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (companyData) {
            setFormData({
                name: companyData.name,
                email: companyData.email,
                phoneNumber: companyData.phoneNumber,
                website: companyData.website,
                address: companyData.address,
            });
        }
        setIsEditing(false);
        setErrors({});
        setGlobalError(null); // Clear any existing errors
        setSuccessMessage(null); // Clear any existing success messages
    };

    if (!companyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="text-gray-800 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-4">Company Settings</h1>
            <GlobalError message={globalError} />
            <GlobalSuccess message={successMessage} />
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        disabled={!isEditing}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        disabled={!isEditing}
                    />
                    <InputField
                        label="Phone"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                        disabled={!isEditing}
                    />
                    <InputField
                        label="Website"
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        error={errors.website}
                        disabled={!isEditing}
                    />
                </div>
                <InputField
                    label="Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    disabled={!isEditing}
                />

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <ActionButtons
                        isEditing={isEditing}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onEdit={handleEdit}
                    />
                </div>
            </form>
        </div>
    );
}

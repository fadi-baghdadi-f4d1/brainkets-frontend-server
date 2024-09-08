'use client';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import InputField from '../component/smtp/InputField';
import DropdownField from '../component/smtp/DropdownField';
import BooleanToggle from '../component/smtp/BooleanToggle';
import ActionButtons from '../component/smtp/ActionButtons';
import { getSmtpById } from '@/services/settings/smtp/GetSmtpById';
import { updateSmtp } from '@/services/settings/smtp/UpdateSmtp';
import { sendTestEmail } from '@/services/settings/smtp/SendTestEmail';
import GlobalError from '../component/GlobalError';
import GlobalSuccess from '../component/GlobalSuccess';

const validationSchema = Yup.object().shape({
    mailDriver: Yup.string().required('Mail driver is required'),
    mailHost: Yup.string().required('Mail host is required'),
    mailPort: Yup.number().required('Mail port is required').positive('Mail port must be a positive number'),
    mailUsername: Yup.string().required('Mail username is required').email('Invalid email format'),
    mailPassword: Yup.string().required('Mail password is required'),
    mailFromName: Yup.string().required('From name is required'),
    mailFromEmail: Yup.string().required('From email is required').email('Invalid email format'),
    mailEncryption: Yup.string().required('Mail encryption is required'),
    mailConnection: Yup.string().required('Mail connection is required'),
});

const SmtpSettingsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        mailDriver: '',
        mailHost: '',
        mailPort: 0,
        mailUsername: '',
        mailPassword: '',
        mailFromName: '',
        mailFromEmail: '',
        mailEncryption: 'tls',
        mailConnection: 'sync',
        isVerified: false,
    });

    const [initialData, setInitialData] = useState(formData); // Store initial data
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);

    // Fetch SMTP data on component mount
    const fetchData = async () => {
        try {
            const data = await getSmtpById(1);
            setFormData(data);
            setInitialData(data);
        } catch (err: any) {
            setGlobalError(err.message || 'Failed to fetch SMTP settings');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'mailPort' ? Number(value) : value,
            isVerified: false,
        }));
        setIsEditing(true);
        // Clear the error for this field when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
        }));
        setIsEditing(true);
    };

    const handleSave = async () => {
        setGlobalError(null);
        setSuccessMessage(null);
        setTestEmailResult(null);
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            await updateSmtp(1, formData);
            setIsEditing(false);
            setInitialData(formData);
            setSuccessMessage('SMTP settings updated successfully');
            await fetchData();
        } catch (err: any) {
            if (err instanceof Yup.ValidationError) {
                const validationErrors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            } else {
                setGlobalError(err.message || 'An error occurred while updating SMTP settings');
            }
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
        setIsEditing(false);
        setErrors({});
        setGlobalError(null);
        setSuccessMessage(null);
        setTestEmailResult(null);
    };

    const handleTestEmail = async () => {
        setTestEmailResult(null);
        setGlobalError(null);
        try {
            const success = await sendTestEmail(formData);
            if (success) {
                setTestEmailResult({ success: true, message: 'Test email sent successfully' });
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    isVerified: true,
                }));
            } else {
                setTestEmailResult({ success: false, message: 'Failed to send test email' });
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    isVerified: false,
                }));
            }
            setIsEditing(true);
        } catch (err: any) {
            setTestEmailResult({ success: false, message: err.message || 'An error occurred while sending test email' });
            setFormData((prevFormData) => ({
                ...prevFormData,
                isVerified: false,
            }));
            setIsEditing(true);
        }
    };

    return (
        <div className="smtp-settings-page text-gray-800 p-4">
            <h1 className="text-2xl font-bold mb-4">SMTP Settings</h1>
            <GlobalError message={globalError} />
            <GlobalSuccess message={successMessage} />
            {testEmailResult && (
                <div
                    className={`bg-${testEmailResult.success ? 'green' : 'red'}-100 border border-${testEmailResult.success ? 'green' : 'red'}-400 text-${testEmailResult.success ? 'green' : 'red'}-700 px-4 py-3 rounded relative mb-4`}
                    role="alert"
                >
                    <span className="block sm:inline">{testEmailResult.message}</span>
                </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Mail Driver"
                        name="mailDriver"
                        value={formData.mailDriver}
                        onChange={handleChange}
                        error={errors.mailDriver}
                    />
                    <InputField
                        label="Mail Host"
                        name="mailHost"
                        value={formData.mailHost}
                        onChange={handleChange}
                        error={errors.mailHost}
                    />
                    <InputField
                        label="Mail Port"
                        name="mailPort"
                        type="number"
                        value={formData.mailPort}
                        onChange={handleChange}
                        error={errors.mailPort}
                    />
                    <InputField
                        label="Mail Username"
                        name="mailUsername"
                        value={formData.mailUsername}
                        onChange={handleChange}
                        error={errors.mailUsername}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Mail Password"
                        name="mailPassword"
                        value={formData.mailPassword}
                        onChange={handleChange}
                        error={errors.mailPassword}
                    />
                    <InputField
                        label="Mail From Name"
                        name="mailFromName"
                        value={formData.mailFromName}
                        onChange={handleChange}
                        error={errors.mailFromName}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Mail From Email"
                        name="mailFromEmail"
                        value={formData.mailFromEmail}
                        onChange={handleChange}
                        error={errors.mailFromEmail}
                    />
                    <DropdownField
                        label="Mail Encryption"
                        name="mailEncryption"
                        value={formData.mailEncryption}
                        options={['Tls', 'Ssl', 'None']}
                        onChange={handleChange}
                        error={errors.mailEncryption}
                    />
                </div>
                <BooleanToggle
                    label="Verified"
                    name="isVerified"
                    checked={formData.isVerified}
                    onChange={handleToggle}
                    disabled // Make it non-clickable
                />
                <DropdownField
                    label="Mail Connection"
                    name="mailConnection"
                    value={formData.mailConnection}
                    options={['Sync', 'Async']}
                    onChange={handleChange}
                />
                <ActionButtons
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onTestEmail={handleTestEmail}
                    isEditing={isEditing}
                />
            </form>
        </div>
    );    
};

export default SmtpSettingsPage;
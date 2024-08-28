import Image from 'next/image';

const fileIconUrl = (extension: string) => `https://erp.smcare.net/images/icons/extensions_new/${extension}.png`;

export const getIconForFile = (fileType: string): JSX.Element => {
  // Corrected mapping of file extensions to corresponding icon names
  const extensionMap: { [key: string]: string } = {
    pdf: 'pdf',
    xlsx: 'xlsx',
    xls: 'xls', 
    doc: 'doc',
    docx: 'docx',
    ppt: 'ppt',
    pptx: 'pptx',
    txt: 'txt',
    zip: 'zip',
    mp4: 'mp4',
    mov: 'mov',
    avi: 'avi',
    mp3: 'mp3',
    wav: 'mp3',
    jpg: 'jpg',
    jpeg: 'jpeg',
    png: 'png',
    gif: 'gif',
  };

  // Extract file extension and map it to icon
  const fileExtension = fileType.split('.').pop()?.toLowerCase() || '';
  const iconExtension = extensionMap[fileExtension] || 'file'; // Default to 'file' if extension is not found

  // Debugging logs
  console.log("File Type:", fileType);
  console.log("Extracted Extension:", fileExtension);
  console.log("Mapped Icon Extension:", iconExtension);
  console.log("Generated URL:", fileIconUrl(iconExtension));

  return (
    <Image
      src={fileIconUrl(iconExtension)}
      alt={`${iconExtension} icon`}
      width={50}
      height={50}
      className="rounded-sm"
      onError={(e) => (e.currentTarget.src = fileIconUrl('file'))} // Fallback to generic file icon
    />
  );
};

export enum FileStorageServices {
  LOCAL = 'local'
}

const getFileStorageService = () => {
  const type = process.env.FILE_STORAGE as FileStorageServices;

  if (!Object.values(FileStorageServices).includes(type)) {
    throw new Error(`Invalid File Storage Service: ${type}`);
  }

  return type;
};

export const FILE_STORAGE = getFileStorageService();
export interface FileData{
    fileName: string
    fileType: string | null
    Key: string
    LastModified:Date
    presignedUrl : string | null
}
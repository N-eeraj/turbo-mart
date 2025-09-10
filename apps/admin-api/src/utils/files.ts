/**
 * Converts a Multer file object into a native `File` instance.
 *
 * @param file - A Multer file object (typically from `req.file`). Can be `undefined`.
 * 
 * @returns A native `File` instance if the file and its buffer exist, otherwise `null`.
 */
export function multerToFile(file: Express.Multer.File | undefined): File | null {
  if (!file?.buffer) return null

  return new File(
    [file.buffer as BlobPart],
    file.originalname,
    { type: file.mimetype }
  )
}

/**
 * Extracts the file extension from a file name.
 *
 * @param file - The file object.
 * 
 * @returns The file extension (e.g., "pdf", "png"). Returns the full name if no dot is present.
 */
export function getFileExtension({ name }: File) {
  return name.slice(name.lastIndexOf(".") + 1)
}

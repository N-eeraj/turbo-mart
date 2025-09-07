/**
 * Converts a Multer file object into a native `File` instance.
 *
 * @param file - A Multer file object (typically from `req.file`). Can be `undefined`.
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

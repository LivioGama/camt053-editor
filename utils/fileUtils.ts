import SparkMD5 from 'spark-md5'

export const readFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target?.result as string)
    reader.onerror = e => reject(e)
    reader.readAsText(file)
  })

export const calculateMD5 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = e => {
      const binary = e.target?.result
      if (binary) {
        const spark = new SparkMD5.ArrayBuffer()
        spark.append(binary as ArrayBuffer)
        const md5 = spark.end()
        resolve(md5)
      }
    }

    reader.onerror = error => reject(error)
  })

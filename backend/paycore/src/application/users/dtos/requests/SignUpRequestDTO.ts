export interface SignUpRequestDTO {
  name: string
  paternalSurname: string
  maternalSurname?: string | null
  email: string
  password: string
}
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  points: number
  level: 'bronze' | 'silver' | 'gold' | 'diamond'
  location?: string
  age?: number
}

import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

import Product from "../types/Product"

function ProfilePage() {
  const params = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  return (
    <>
      
    </>
  )
}

export default ProfilePage
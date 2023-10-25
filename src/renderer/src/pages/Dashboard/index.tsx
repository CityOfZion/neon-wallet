import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSelectorRef from '@renderer/hooks/useSelectorRef'

export const DashboardPage = () => {
  const isFirstTimeRef = useSelectorRef(state => state.settings.isFirstTime)
  const navigate = useNavigate()

  useEffect(() => {
    if (isFirstTimeRef.current) {
      navigate('/welcome')
    }
  }, [navigate, isFirstTimeRef])

  return <div>Dashboard</div>
}

import { logout } from '@/actions/auth'

const AdminDashboard = () => {
  return (
    <>
    <div>Welcome to Dashboard</div>
    <div>
        <form action={logout}>
  <button type="submit">
    Logout
  </button>
</form>
    </div>
    </>
  )
}

export default AdminDashboard
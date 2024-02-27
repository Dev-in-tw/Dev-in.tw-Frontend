export default function Status(prop: any) {
  if (prop.status === "active") {
    return (
      <span className="text-green-500">ACTIVE</span>
    )
  } else if (prop.status === "inactive") {
    return (
      <span className="text-red-500">INACTIVE</span>
    )
  } else if (prop.status === "reject") {
    return (
      <span className="text-red-500">REJECT</span>
    )
  } else if (prop.status === "pending") {
    return (
      <span className="text-yellow-500">PENDING</span>
    )
  } else {
    return (
      <span className="text-gray-500">UNKNOWN</span>
    )
  }
}
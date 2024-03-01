export default function Status(prop: any) {
  if (prop.status === "active") {
    return <span className="text-green-500">可使用</span>;
  }
  else if (prop.status === "inactive") {
    return <span className="text-orange-500">不可使用</span>;
  }
  else if (prop.status === "reject") {
    return <span className="text-red-500">已駁回</span>;
  }
  else if (prop.status === "pending") {
    return <span className="text-yellow-500">審核中</span>;
  }
  else {
    return <span className="text-gray-500">未知</span>;
  }
}

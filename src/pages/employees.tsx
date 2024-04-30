import { useEffect, useState } from "react";
import { GetAllEmployee } from "../../graphql/query/employee";
import { graphqlClient } from "../../clients/api";
import { useRouter } from "next/router";

function Employee() {
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const navigate = useRouter();
  console.log(navigate, " navigate function ");
  useEffect(() => {
    fetchEmployee();
  }, []);

  async function fetchEmployee() {
    const { getAllEmployees } = await graphqlClient.request(GetAllEmployee);
    if (getAllEmployees != null && getAllEmployees.length > 0) {
      setEmployeeData(getAllEmployees);
    }
  }

  const handleNavigate = () => {
    navigate.push("/admin");
  };

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Our Employees{" "}
        </h1>
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleNavigate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add New Employee
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employeeData.map((employee) => (
            <div
              key={employee.id}
              className="bg-gray-800 rounded-lg shadow-md p-4"
            >
              <img
                src={employee.ProfileImageUrl}
                alt={employee.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-white text-center mb-2">
                {employee.name}
              </h2>
              <p className="text-gray-400 text-center mb-2">{employee.email}</p>
              <p className="text-gray-400 text-center mb-2">
                Software Engineer
              </p>
              <a
                href={employee.LinkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 block text-center hover:underline"
              >
                {employee.LinkedinProfile}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Employee;

import { useState, useEffect, useRef } from "react";
import { graphqlClient } from "../../clients/api";
import { VerifyAdminDetail } from "../../graphql/query/admin";
import { useRouter } from "next/router";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("_admin_token") ? router.push("/dashboard") : null;
  });
  const handleSubmit = async () => {
    if (!email || !password || !adminKey) {
      return;
    }

    const { getAdminDetail } = await graphqlClient.request(VerifyAdminDetail, {
      email,
      password,
      key: adminKey,
    });
    if (getAdminDetail == null) return;
    localStorage.setItem("_admin_token", getAdminDetail);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Admin Sign in
          </h2>
        </div>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm">
          <div className="mt-4">
            <input
              aria-label="Admin Key"
              name="adminKey"
              type="password"
              required
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Admin Key"
            />
          </div>

          <div>
            <div className="mt-4">
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

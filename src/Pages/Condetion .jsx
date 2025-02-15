
import React from "react";

export default function Condetion() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Eligibility Conditions and Guidelines</h1>

      <h2 className="text-2xl font-semibold mt-6 text-orange-600">Eligibility to rent a flat or bedroom</h2>
      <h3 className="text-xl font-semibold mt-4">Citizenship</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Singapore Citizen</li>
        <li>Permanent Resident</li>
        <li>Foreigners with valid passes such as Employment Pass, S Pass, Work Permit, Student Pass, Dependant Pass, or Long Term Visit Pass.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Tenancy and property ownership status</h3>
      <p className="mt-2">
        You must have a valid and active HDB flat lease to rent out the flat. If you are renting out a room, you must have lived in the flat for at least 6 months. 
        However, if you are a tenant, you must obtain approval from your landlord. 
      </p>

      <h3 className="text-xl font-semibold mt-4">Guidelines</h3>
      <p className="mt-2">
        To rent out your flat, you must meet the following criteria:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Your flat must be at least 5 years old.</li>
        <li>You must not have any outstanding housing loans.</li>
        <li>You must be in compliance with the HDB's regulations.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Proof of ownership and intent to rent out the flat</h3>
      <p className="mt-2">
        You need to provide proof of your ownership, such as the title deed of the flat or any other relevant documentation confirming that you are the registered owner of the flat.
      </p>

      <p className="mt-2">
        In addition, you may be required to provide proof of the approval of HDB's confirmation that you are a registered tenant.
      </p>

      <h3 className="text-xl font-semibold mt-4">Important Notes</h3>
      <p className="mt-2 text-orange-600">
        Ensure that all documentation is accurate and up-to-date to avoid any delays in the rental process.
      </p>
    </div>
  );
}
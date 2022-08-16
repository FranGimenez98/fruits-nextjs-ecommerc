import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";

export default function DashboardScreen() {
  return (
    <Layout title="Admin Dashboard">
      <div className="mt-[4rem]">
        <Link href="/admin/post">
          <a>
            <button className="button">POST</button>
          </a>
        </Link>
      </div>
    </Layout>
  );
}

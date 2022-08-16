import React from 'react'
import Layout from '../../../components/Layout'
import db from '../../../utils/db'
import User from '../../../models/User'

export default function ProfileUserScreen({user}) {
  console.log(user)
  return (
    <Layout title={`User ${user.name}`}>
      <div className="mt-[4rem]">
 <h2>{user.name}</h2>
      </div>
     
    </Layout>
  )
}

export const getServerSideProps = async(context) => {
  const {params} =  context;
  const {id} = params;

  await db.connect();
  const user = await User.findOne({id}).lean();
  await db.disconnect();
  return {
    props: {
      user: user ? db.docToObject(user) : null
    }
  }
}



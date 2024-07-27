'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJs,
  CategoryScale,
  LineController,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2'
import Loader from "../components/Loader";




export default function Home() {

  const { data: session,status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return (
        <div className='loadingdata flex flex-col flex-center wh_100'>
            <Loader />
        </div>
    );
}
  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login')
  //   }

  // }, [router, session]);
  ChartJs.register(CategoryScale, LineController, LinearScale, BarElement, Title, Tooltip, Legend);
  // ChartJs.register(CategoryScale, LineController, LinearScele, BarElement, Title, Tooltip, Legend)
  const [blogsBata, setBlogsData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('api/blogapi');
        const data = await res.json();
        setBlogsData(data)
      } catch (error) {
        console.log('Error Fetching Data', error);
      }
    }

    fetchData();
  }, [])

  // define options within the component scope

  const options = {
    resposive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly By Year'
      }
    }
  }
 


  const monthlyDate = blogsBata.filter(item => item.status === 'publish').reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth()
    acc[year] = acc[year] || Array(12).fill(0);

    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Data().getFullYear();
  const years = Object.keys(monthlyDate);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateSets = years.map(year => ({
    label: `${year}`,
    data: monthlyDate[year] || Arrray(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.5)`
  }))

  const data = {
    labels,
    dateSets
  }
  if (session) {
    return (
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div date-aos='fade-right'>
            <h2>Blogs <span>Dashboard</span></h2>
            <h3>Admin PANEl</h3>
          </div>
          <div className="breadcrumb" date-aos='fade-left' >
            <IoHome /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>
        {/* dashboard card */}
        <div className="topfourcards gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-sb">
          <div className="four_card" date-aos='fade-right'>
            <h2>Total Blogs</h2>
            <span>{blogsBata.filter(item => item.status === 'publish').length} </span>
          </div>
          <div className="four_card" date-aos='fade-right'>
            <h2>Total Topics</h2>
            <span>10</span>
          </div>
          <div className="four_card" date-aos='fade-left'>
            <h2>Total Tags</h2>
            <span>10</span>
          </div>
          <div className="four_card" date-aos='fade-left'>
            <h2>Draft Blogs</h2>
            <span>{blogsBata.filter(item => item.status === 'draft').length}</span>
          </div>
        </div>
        {/* years overview */}
        <div className="year_overview flex flex-sb" >
          <div className="leftyearoverview" date-aos='fade-up'>
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-center"> 10 / 365 <br /> <span>Total Publish</span></h3>
            </div>
            <Bar data={data} options={options} />

          </div>
          {/* chart pendig doing letter  */}
          <div className="right_salescont" date-aos='fade-up'>
            <div >
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Html, Css & JavaScript</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Next JS, React Js</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Deployment</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { useState, useEffect } from 'react'
import SideBar from './SideBar';
import { Bar, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import "./DashBoard.css"

function DashBoard() {
    return (
        <div>
            <SideBar />
            <div class="lead-container">
                <form class="d-flex">
                    <button class="btn btn-outline-dark" type="button" >
                        <i class="bi-cart-fill me-1"></i>
                        Lead Count
                        <span class="badge bg-dark text-white ms-1 rounded-pill">
                            10
                        </span>

                    </button>
                </form>
            </div>
            <div class="revenue-container">
                <form class="d-flex">
                    <button class="btn btn-outline-dark" type="button" >
                        <i class="bi-cart-fill me-1"></i>
                        Deals
                        <span class="badge bg-dark text-white ms-1 rounded-pill">
                            &#36;5
                        </span>

                    </button>
                </form>
            </div>
            <div class="pie-chart">
                <Pie data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: "Overall Leads",
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        backgroundColor: ["#6698E2", "cyan", "crimson", "purple", "grey", "#A8EB12", "#CC66E2", "#208536", "#EBBD12", "#EB5412", "#852051", "#91EB12", "#EBD412", "#6C793B"],
                    }]
                }}

                />
            </div>

        </div>
    )
}

export default DashBoard

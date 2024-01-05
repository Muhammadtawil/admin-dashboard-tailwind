"use client"
import CardDataStats from '@/components/CardDataStats'
import { useSession } from "next-auth/react";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdOutlineAssignmentLate } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
export default function TaskSatsCard({ taskData, assignedToTasks, assignedTasks }: { taskData: any, assignedToTasks: any, assignedTasks: any }) {
    const { data: session } = useSession();

    // 1. Calculate tasksData.length
    const getTotalTasks = () => taskData.length;

    // 2. Calculate taskData where taskData.status === "NOT_COMPLETED" TOTAL
    const getNotCompletedTasks = () => taskData.filter((task: any) => task.taskStatus === "NOT_COMPLETED").length;

    // 3. Calculate taskData where taskData.status === "IN_PROGRESS" TOTAL
    const getInProgressTasks = () => taskData.filter((task: any) => task.taskStatus === "IN_PROGRESS").length;

    // 4. Calculate taskData where ASSIGNEDTask.ASSIGnedTo === "session.userId" TOTAL
    const getUserAssignedTasks = () => assignedToTasks?.length;
    const getUserAssignedByTasks = () => taskData.filter((task: any) => task.assignBy === session?.userId).length

    // 5. Calculate all taskData where created in the previous month (from this month) and calculate the rate increase or decrease
    const getTasksRateChange = () => {
        const currentMonth = new Date().getUTCMonth() + 1;
        const previousMonth = currentMonth - 1;
        // previousMonth.setMonth(previousMonth.getMonth() - 1);

        // Set the start of the current month
        // currentMonth.setDate(1);
        // currentMonth.setHours(0, 0, 0, 0);

        // // Set the start of the previous month
        // previousMonth.setDate(1);
        // previousMonth.setHours(0, 0, 0, 0);

        const currentMonthTasks = taskData.filter((task: any) => new Date(task.createdAt).getUTCMonth() + 1 === currentMonth);
        const previousMonthTasks = taskData.filter((task: any) => new Date(task.createdAt).getUTCMonth() - 1 === previousMonth);
        const assignedByUserTasks = assignedTasks.filter((task: any) => task.assignBy === session?.userId)
        const currentAssignMonthTasks = assignedByUserTasks.filter((task: any) => new Date(task.createdAt).getUTCMonth() + 1 === currentMonth);
        const previousAssignMonthTasks = assignedByUserTasks.filter((task: any) => new Date(task.createdAt).getUTCMonth() - 1 === previousMonth);

        const previousMonthCount = previousMonthTasks.length + currentAssignMonthTasks.length;
        const currentMonthCount = currentMonthTasks.length; +previousAssignMonthTasks.length;

        // Calculate rate change
        const rateChange = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

        return {
            previousMonth,
            currentMonth,
            previousMonthCount,
            currentMonthCount,
            rateChange,
        };
    };

    const tasksRateChangeData = getTasksRateChange();
    const assignedByUserTasks = assignedTasks.filter((task: any) => task.assignBy === session?.userId).length
    const newDate = new Date()
    console.log(tasksRateChangeData);
    const rate = `${tasksRateChangeData.rateChange.toFixed(2)}%`
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats
                title="Total Tasks"
                total={taskData?.length + assignedByUserTasks}
                rate={rate}
                isRate={true}
            >
                <FaTasks />
            </CardDataStats>

            <CardDataStats title="Assigned Task to you" total={getUserAssignedTasks()} rate='+4' isRate={false}>
                <div className='text-xl'>
                    <MdOutlineAssignmentInd />
                </div>
            </CardDataStats>

            <CardDataStats title="Not Completed Tasks" total={getNotCompletedTasks()} rate="" isRate={false} >
                <div className='text-xl'>
                    <MdOutlineAssignmentLate />

                </div>
            </CardDataStats>

            <CardDataStats title="In Progress Tasks" total={getInProgressTasks()} rate="0.95%" isRate={false} >
                <GrInProgress />
            </CardDataStats>
        </div>
    )
}

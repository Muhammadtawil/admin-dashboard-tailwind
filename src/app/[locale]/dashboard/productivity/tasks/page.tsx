import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
// import AddTaskForm from "@/components/tasks/add_task_form";
import TaskTable from "@/components/tasks/task_Table";
import TasksMain from "@/components/tasks/tasks_main";


export default function TasksPage() {
function OnCreat() {
  return;
}
  return (
    <>
       <Breadcrumb pageName="Tasks" />
      {/* <AddTaskForm onCreate={'OnCreat'} /> */}
    <TasksMain/>
      
    </>
  )
}


  import CreateTask, { getAssignedTasks, getAssignedToTasks, getTasks, DeleteTask, DeleteAssignedTask, UpdateTask, UpdateAssignedTask, AssignTask } from "@/server/tasks/tasks";
import { GetUsers, GetUser } from "@/server/users/users";
import { revalidatePath } from "next/cache";
import TaskTable from "./task_Table";
import TaskSatsCard from "./tasks_stats_cards";
  
  
  const loadUserData = async () => {
    const [users, user, assignedTasks, assignedToTasks] = await Promise.all([
      GetUsers(),
      GetUser(),
      getAssignedTasks(),
      getAssignedToTasks(),
    ]);
  
    
  
    return { users, user, assignedTasks, assignedToTasks };
  };
  async function Delete(taskId: string) {
    "use server";
    try {
      await DeleteTask(taskId);
      revalidatePath('tasks','page')
    } catch (error) {}
  }
  
  async function DeleteAssignedTasks(assigntaskId: string) {
    "use server";
    try {
      await DeleteAssignedTask(assigntaskId);
      revalidatePath('tasks','page')
    } catch (error) {
      console.log(error);
    }
  }
  async function onCreate(formData: FormData) {
    "use server";
    revalidatePath('tasks','page')
      await CreateTask(formData);
   
  }
  
  async function onUpdate(formData: FormData, taskId: string) {
    "use server";
    try {
      await UpdateTask(formData, taskId);
    revalidatePath('tasks','page')
  
    } catch (error) {}
  }
  
  async function onUpdateAssigned(formData: FormData, taskId: string) {
    "use server";
    try {
      await UpdateAssignedTask(formData, taskId);
    revalidatePath('tasks','page')
  
    } catch (error) {}
  }
  
  async function SelectMember(formData: FormData, taskId: string) {
    "use server";
    try {
      await AssignTask(formData, taskId);
    revalidatePath('tasks','page')
  
    } catch (error) {}
  }
  
  const TasksMain = async () => {
    const { users, user, assignedTasks, assignedToTasks } =
      await loadUserData();
      const tasks = await getTasks(assignedTasks);
    return (
      <>
        {/* <AddTaskForm onCreate={onCreate} /> */}
        <TaskSatsCard taskData={tasks} assignedTasks={assignedTasks} assignedToTasks={assignedToTasks} />
        <div className="pt-12">
        <TaskTable
          tasksData={tasks}
          deleteTask={Delete}
          OnCreate={onCreate}
          onUpdate={onUpdate}
          getusers={users}
          onSelectMember={SelectMember}
          isAssigned={false}
          // userRole={user.userRole}
          isToMe={false}
          tableTitle="My Tasks"
        />
        </div>
        <div className="pt-12">
        <TaskTable
          tasksData={assignedToTasks}
          deleteTask={Delete}
          OnCreate={onCreate}
          onUpdate={onUpdate}
          getusers={users}
          onSelectMember={SelectMember}
          isAssigned={true}
          // userRole={user.userRole}
          isToMe={true}
          tableTitle="Assigned Task To Me"
        />

        </div>
     

        <div className="pt-12">
        <TaskTable
          tasksData={assignedTasks}
          deleteTask={Delete}
          OnCreate={onCreate}
          onUpdate={onUpdate}
          getusers={users}
          onSelectMember={SelectMember}
          isAssigned={true}
          // userRole={user.userRole}
          isToMe={false}
          tableTitle="Assigned Task By Me"
        />

</div>
  
     
        {/* <TaskTable
          dataRows={assignedToTasks}
          deleteTask={DeleteAssignedTasks}
          updateTask={onUpdateAssigned}
          getusers={users}
          onSelectMember={SelectMember}
          isAssigned={true}
          userRole={user.userRole}
          isToMe={true}
          tableTitle="assignedToMeTitile"
        />
  
        {user.userRole === "ADMIN" ? (
          <>
        
  
            <TaskTable
              dataRows={assignedTasks}
              deleteTask={DeleteAssignedTasks}
              updateTask={onUpdateAssigned}
              getusers={users}
              onSelectMember={SelectMember}
              isAssigned={true}
              userRole={user.userRole}
              isToMe={false}
              tableTitle="assignedByTitle"
            />  */}
          </>
        // ) : null}
    //   </>
    );
  };
  
  export default TasksMain;
  
import TaskForm from '@/components/task-form'

export default function page() {
  return (
    <section className=''>
      <div className='mx-auto flex max-w-xl flex-col justify-center rounded-xl px-4'>
        <h1 className='text-center text-3xl font-semibold'>Create Task</h1>
        <TaskForm />
      </div>
    </section>
  )
}

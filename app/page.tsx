import { UserForm } from '@/components/user';

const HomePage = () => {
  return (
    <section className='mt-10 flex flex-col items-center gap-10 p-1'>
      <h2>설문제목</h2>
      <p>설명</p>
      <UserForm />
    </section>
  );
};

export default HomePage;

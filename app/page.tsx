import { UserForm } from '@/components/user';

const HomePage = () => {
  return (
    <section className='mt-10 flex flex-col items-center gap-10 p-4'>
      <h2>회사 근처 맛집 설문조사</h2>
      <p>회사 근처에는 어떤 맛집들이 있을까요? 이 설문조사에 참여하여 회사 주변 맛집에 대한 솔직한 의견을 들려주세요!</p>
      <UserForm />
    </section>
  );
};

export default HomePage;

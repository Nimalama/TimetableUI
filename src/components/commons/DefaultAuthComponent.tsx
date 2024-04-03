import { DefaultPNG } from "../../assets/images";

const DefaultAuthComponent = () => {
  return (
    <section className='default-auth'>
      <div className='image'>
        <img src={DefaultPNG} alt='Default' />
      </div>
    </section>
  );
};

export default DefaultAuthComponent;

import ClientImg1 from "../../../../public/images/Testimonial/client1.jpg";
import ClientImg2 from "../../../../public/images/Testimonial/client2.jpg";
import ClientImg3 from "../../../../public/images/Testimonial/client3.jpg";
import ClientImg4 from "../../../../public/images/Testimonial/client4.jpg";
import ClientImg5 from "../../../../public/images/Testimonial/client5.jpg";
import { useTranslations } from "next-intl";

const getTestimonialsData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('webTestimonials')
  return {
    section: {
      title: "Testimonial from My Clients",
    },
    testimonials: [
      {
        name: "Joseph Stoneman",
        position: "Product Manager at Ed-Tech",
        image: ClientImg1,
            message: t('content1'),
        status:'deployed'
          
      },
      {
        name: "Cheryle Bojorquez",
        position: "Founder at SherpTech",
        image: ClientImg2,
        message:t('content2'),
        status:'draft'
      },
      {
        name: "William Tabor",
        position: "Designer at bitTech",
        image: ClientImg3,
        message:t('content3'),
        status:'deployed'
      },
      {
        name: "Jeanne Russo",
        position: "Manager at BitByte",
        image: ClientImg4,
        message:t('content4'),
        status:'draft'
      },
      {
        name: "Joshua McNair",
        position: "CEO at JohoSoft",
        image: ClientImg5,
        message:t('content5'),
        status:'deployed'
      },
    ],
  }
}

export default getTestimonialsData;

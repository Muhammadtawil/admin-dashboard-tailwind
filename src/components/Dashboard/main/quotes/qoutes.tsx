
"use client"
import { useEffect, useState } from 'react'
import { IoCopyOutline } from "react-icons/io5";
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Translator } from 'google-translate-api-x';
import { LuArrowRightCircle } from "react-icons/lu";
import arabicQuotesData from './arabic-quotesDta';
import { englishQuotesData } from './english-quoteData';
const TestimonialCard = () => {
    const [quote, setQuote] = useState('');

    const [author, setAuthor] = useState('');
    const [copied, setCopied] = useState(false);
    const t=useTranslations('mainPage')
    const path = usePathname();
    
const locale=useLocale()
    const generateQuote = async () => {
        try {
    
            const quoteList = locale=='ar'
             ? arabicQuotesData : englishQuotesData;
          if (!quoteList || quoteList.length === 0) {
            console.error('Empty or invalid response from the API');
            return;
          }
      
          const randomIdx = Math.floor(Math.random() * quoteList.length);
          const quoteText = quoteList[randomIdx].text;
          const auth = quoteList[randomIdx].author || 'Anonymous';
 
          setQuote(quoteText);

            setAuthor('~ ' + auth);

        } catch (error) {
          console.error('Error fetching or translating quote:', error);
        }
      };
      
 
    useEffect(() => {
        generateQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const copyToClipboard = () => {
        const textArea = document.createElement('textarea');
        textArea.value = quote;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
 
        setTimeout(() => setCopied(false), 2000);
    };
  return (
    <div className="col-span-2 w-full flex flex-1  items-center justify-center px-5 py-5">
      <div className="w-full  mx-auto rounded-lg dark:bg-strokedark  bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800" style={{ maxWidth: '100%' }}>
      <div className="relative">
  <div className="absolute top-0 right-0 ">       <button 
                className='GenerateQuote_next' 
                onClick={copyToClipboard}>
           <IoCopyOutline/>
                  </button>
                  </div>
</div>

              <div className="w-full pt-1 pb-5">
   
        </div>
        <div className="w-full mb-10">
          <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
          <p className="text-sm text-gray-600 text-center px-5">{quote}</p>
          <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
        </div>
        <div className="w-full">
          <p className="text-md text-indigo-500 font-bold text-center">{author}</p>
          {/* <p className="text-xs text-gray-500 text-center">@scott.windon</p> */}
              </div>
              <div className="relative flex bottom-0 right-0">
             
  <div className="absolute bottom-0 right-0 max-sm:top-0 max-sm:left-0">
    <button 
      className='GenerateQuote_next text-2xl' 
      onClick={generateQuote}
    >
      <LuArrowRightCircle />
    </button>
  </div>
</div>


          
      </div>

    </div>
  );
};

export default TestimonialCard;

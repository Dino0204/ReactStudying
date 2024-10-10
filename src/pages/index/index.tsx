import CommonHeader from '@/components/common/header/CommonHeader';
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar';
import CommonNav from '@/components/common/navigation/CommonNav';
import CommonFooter from '@/components/common/footer/CommonFooter';
import Card from './components/Card';
import { CardDTO } from './types/card';
import styles from './styles/index.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Index() {
  const [imgUrls,setImgUrls] = useState([]);
  const getData = async () => {
    const API_URL = 'https://api.unsplash.com/search/photos';
    const API_KEY = '2koWX1IRS_H1uUhtFS3oEGcFPC-8UMKuIoORLaaNZNM';
    const PER_PAGE = 30;

    const searchValue = 'Korea';
    const pageValue = 100;

    try{
      const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`)
      // console.log(res)
      // res.data.results
      // 200 = 통신완료
      if(res.status === 200){
        setImgUrls(res.data.results)
      }

    }catch(error) {
      console.log(error)
    }
  }
  const cardList = imgUrls.map((card:CardDTO)=>{
    return(
      <Card data={card} key = {card.id}/>
    )
  })

  useEffect(()=>{
    getData()
  })

  return (
    <div className={styles.page}>
      {/* 공통헤더  */}
      <CommonHeader/>
      {/* 공통네비 */}
      <CommonNav/>
      <div className={styles.page_contents}>
        <div className={styles.page_contents_introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper_title}>PhotoSplash</span>
            <span className={styles.wrapper_desc}>
              시각 자료 출처
              <br/>
              모든 크리에이터의 지원을 받습니다.
            </span>
            {/* 검색창  */}
            <CommonSearchBar/>
          </div>
        </div>
        <div className={styles.page_contents_imageBox}> 
          {cardList}
        </div>
      </div>    
      {/* 공통푸터 */}
      <CommonFooter/>
    </div>
  )
}

export default Index

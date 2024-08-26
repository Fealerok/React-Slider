import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  //Состояния предыдущего активного элемента, настоящего активного и прокрутка элементов на странице
  const [prevIndex, setPrevIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  //Хук, срабаывающий при изменении нынешнего активного элемента, который обновляет прокрутку слайдера
  useEffect(() => {
    updateTranslateSlider();
  }, [currentIndex]);


  //Функция обновления прокрутки слайдера
  function updateTranslateSlider(){
    const slideWidth = document.querySelector(".slider-item").offsetWidth;
    const sliderTrack = document.querySelector(".slider-track");

    //Рассчет прокрутки слайдера
    setTranslateX((((sliderTrack.offsetWidth/2)) - slideWidth/2) - currentIndex * (slideWidth+50));

    setActiveItem(prevIndex, currentIndex, sliderTrack);
  }
  
  //Установка активного элемента путем добавления соответствующего класса
  function setActiveItem(prevIndex, currentIndex){
    const sliderTrack = document.querySelector(".slider-track");
    sliderTrack.children[prevIndex].classList.remove("active");
    sliderTrack.children[currentIndex].classList.add("active");
  }

  //Функция отображения следующего элемента в слайдере
  function showNextItem(){
    
    setCurrentIndex((prevIndex) => {
      setPrevIndex(prevIndex);
      return prevIndex === document.querySelector(".slider-track").children.length - 1 ? 0 : prevIndex + 1;
    });

    setActiveItem(prevItem, currentIndex);

  }

   //Функция отображения предыдущего элемента в слайдере
  function showPrevItem(){
    setCurrentIndex((prevIndex) => {
      setPrevIndex(prevIndex);
      return prevIndex === 0 ? document.querySelector(".slider-track").children.length - 1 : prevIndex - 1
    }
    );

    setActiveItem(prevItem, currentIndex);
  }

  //Обработчик событий на изменение размеров страницы для обновления положения элементов в слайдере при разной ширине
  window.addEventListener("resize", () => {
    updateTranslateSlider();
  });

  return (
    <>
      <div className="slider">
        <div className="slider-track" style={{transform: `translateX(${translateX}px)`}}>

          <div className="slider-item">
            <div className="avatar"></div>
            <span>текст слайдера 1</span>
          </div>

          <div className="slider-item">
          <div className="avatar"></div>
            <span>текст слайдера 2</span>
          </div>

          <div className="slider-item">
          <div className="avatar"></div>
            <span>текст слайдера 3</span>
          </div>

          <div className="slider-item">
          <div className="avatar"></div>
            <span>текст слайдера 4</span>
          </div>

          <div className="slider-item">
          <div className="avatar"></div>
            <span>текст слайдера 5</span>
          </div>
        </div>
        
        <button className="prev_button" onClick={showPrevItem}>←</button>
        <button className="next_button" onClick={showNextItem}>→</button>
      </div>
    </>
  )
}


export default App;
import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import Terminal from './Terminal'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
    <Terminal />
  </div>
)

export default HomeView

import { FC } from 'react'
import preloader from '../../files/img/preloader.svg'

type PropsType = {}

const Preloader: FC<PropsType> = () => {

   return  <img src={preloader} alt={'Preloader'}/>

}

export default Preloader
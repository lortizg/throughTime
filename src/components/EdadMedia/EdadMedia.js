import React, { useEffect, useState,useRef } from 'react';
import styles from './EdadMedia.module.scss';
import { butterflyImage } from '../../App';
import ChooseImages from '../ChooseImages/ChooseImages';


const  IMAGES = {
  castillo:'https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg',
  mercado:'/market.jpg',
  cervecera:'/cervecera.webp',
  guardia:'/guardia.webp',
  lio:'/lio.webp',
  amnis:'/amnis.png'
}

const dialogs=[
  {character:'',desc:''}, // 0
  {character:'blue',desc:'Uf, qué mareo...'}, // 1
  {character:'blue',desc:'¡Oh! Ahí estás'}, // 2
  {character:'blue',desc:'Llamas un poquito la atención así, ¿no crees?'}, // 3
  {character:'blue',desc:'He mirado en un libro ropa apropiada. ¿Qué opinas?'}, // 4
  {character:'blue',desc:'b̴̧̳̦͓́͂͠͠r̷͇̖̼̬̗̔͌͋̚ů̸̙̩͈͓ͅj̶̯͙͔͍̐̉̈́̿͝a̶̛͔͚͙͐͌̇ ̷̧̪̔̈͘b̷̖͍͋̒̕͝ř̸͚͇̮̐̕̕ų̴͔̭̪̃̉̑͂͠j̴̹̤̙̳͇͑̀ă̷͖̞̤͚͆̋͐́͜'}, //5
  {character:'blue',desc:'¿Estás segura de eso, Carla?'}, //opcion 0 // 6
  {character:'blue',desc:'Bueno, allá tú'}, //opcion 0 // 7
  {character:'blue',desc:'Las aventuras no se viven solas'}, //opcion 0 // 8
  {character:'blue',desc:'Por el camino fácil, ¿eh?'}, //opcion 1 // 9
  {character:'blue',desc:'En la ropa no se despilfarra, sí. Eso dice Jaein'}, //opcion 1 // 10
  {character:'blue',desc:'Tenga un buen paseo por el pueblo, milady'}, //opcion 1 // 11
  {character:'blue',desc:'¡Buena suerte!'}, // 12

  {character:'narrator',desc:'Ahora que Blue ha desaparecido, finalmente te fijas en el paisaje'}, // 13
  {character:'narrator',desc:'En el cielo hay algunas nubes por las que comienzan a aparecer los rayos del sol. El olor de la tierra aún en el ambiente y los charcos en el suelo te hace pensar que ha llovido hace poco'}, // 13
  {character:'narrator',desc:'Las calles, las ropas y la gente te hacen pensar que realmente estás en... la Edad Media'}, // 14
  {character:'narrator',desc:'Y Blue se ha llevado tus cosas, claro'}, // 16
  {character:'narrator',desc:'Paseas, sin saber realmente qué hacer'}, // 17
  {character:'narrator',desc:'El dulce olor de las garrapiñadadas te hace acercarte al mercado'}, // 18
  {character:'narrator',desc:'Algunos niños a los lejos corretean sobre los charcos. Escuchas sus risas desde ahí'}, // 18
  {character:'narrator',desc:'Se respira un buen ambiente, incluso tras la lluvia. El gentío comienza a agolparse de nuevo'}, // 20
  {character:'narrator',desc:'El carácter risueño, las bebidas que van y vienen y lo viva que empieza a verse la calle te hacen pensar que se celebra una gran fiesta'}, // 20

  {character: 'narrator', desc:'"¡Bien hallados! ¡Bien hallados, que el Niño Dios va a nacer!"'}, // 21
  {character: 'narrator', desc:'Se trata de la voz de una mujer. Los barriles, el sombrero en pico y el humo que se entrevee del caldero que remueve entre bastidores te recuerdan una imagen muy clara'}, // 22
  {character: 'narrator', desc:'Menos mal que sabes que es una cervecera'}, //25
  {character: 'cervecera', desc:'¡Bien hallados! ¡Bien hallados, que el Niño Dios va a nacer!'},
  {character: 'cervecera', desc:'¡Vengan! ¡Beban y celebren! ¡Los doce días de fiesta aún están por empezar!'},
  {character: 'cervecera', desc: '¡Usted también, señorita!'},

  {character: 'main', desc:'', options:['Aceptar','Negarse']},

  {character: 'cervecera', desc: '¡Sabía que eras de las mías!'}, // opcion 0 //30
  {character: 'cervecera', desc: 'Una de cobre, por favor'}, // opcion 0
  {character: 'cervecera', desc: '¡Oh, venga! Va a nacer Nuestro Señor Dios, ¡es momento de celebrar!'}, // opcion 1
  {character: 'cervecera', desc: '¿No? Bueno, ¿qué vamos a hacer? ¡Vaya en paz, hermana!'}, // opcion 1

  {character: 'narrator', desc:'Continúas tu paseo por el mercado'},
  {character: 'narrator', desc:'Realmente parece haber de todo: frutas, verduras, especias, leche y quesos, gallinas, ganado, textiles, manualidades... Estos últimos parecen particularmente concurridos por las fechas'}, //35
  {character: 'narrator', desc:'Pero te llama la atención algo en particular'},
  {character: 'narrator', desc:'Un objeto rectangular y pesado, impreso, con folios. No consigues distinguir la imagen impresa en su portada'},
  {character: 'narrator', desc:'¿Es eso un... libro?'},
  {character: 'narrator', desc:'Un libro común'},
  {character: 'narrator', desc:'Cuanto más lo miras, más reconoces que es un libro'}, //40
  {character: 'narrator', desc:'¿Qué hace un libro aquí?'},

  {character:'narrator', desc:'Disculpe'},
  {character:'guardia', desc:'¡Disculpe!'},
  {character:'guardia', desc:'Disculpe, señorita... ¿Qué hombre es su tutor?'},
  {character:'narrator', desc:'Esta dama está bajo mi cuidado. ¿Qué desea?'},
  {character:'narrator', desc: 'Ante ti encuentras un hombre alto de largos cabellos negros, vestido en ropas oscuras. Sus ojos violetas te dejan bastante claro de quién se trata'},

  
  {character: 'narrator', desc:'La dama con la que habla es mi esposa. Le sugiero tratarla con respeto'},
  {character: 'narrator',desc:'Un hombre de cabellos ondulados, rojos como el fuego y vestido en ropas caballerizas se acerca hasta ti. Al alzar la mirada ves su expresión decidida'},

]


function EdadMedia () {
  const butterfly = useRef(null);
  const imagenEntrecortada= useRef(null);
  const [backgroundImage,setBackgroundImage] = useState(IMAGES.castillo);
  // const [option, setOption] = useState(0);

  const [dialog,setDialog] = useState({position:0, character:dialogs[0].character, desc:dialogs[0].desc});
  // const [dialog,setDialog] = useState({position:34, character:dialogs[34].character, desc:dialogs[34].desc});


  const [active, setActive] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [choosingMain, setChoosingMain] = useState(false);
  const [hoguera, setHoguera]= useState(false);


  useEffect(() => {
      setTimeout(()=>{
        butterfly.current.style.opacity=1;
        setActive(true);
      },2000)
      
      setTimeout(()=>{
        setDialog({position:1,character:dialogs[1].character, desc:dialogs[1].desc});
        // setDialog({position:34, character:dialogs[34].character, desc:dialogs[34].desc});

      },3000)
    

    /** Dependencias. Si metiera glasses se ejecutaria lo de antes cada vez que cambie el estado de este */
  }, []);


  function nextDialog(next = 1){
    setDialog({position:(dialog.position+next), character:dialogs[dialog.position+next].character, desc:dialogs[dialog.position+next].desc, options:dialogs[dialog.position+next].options? dialogs[dialog.position+next].options: []});
  }


  function handleClick(){
    if(dialog.position<dialogs.length-1 && !choosing && !hoguera && !choosingMain){
      nextDialog();
    }
    switch(dialog.position){
      case 3:
        setChoosing(true);
        break;
      case 12:
        setActive(false);
        butterfly.current.style.opacity=0;
        break;
      case 8:
        setDialog({position:12,character:dialogs[12].character, desc:dialogs[12].desc});
        break;
      case 17:
        setBackgroundImage(IMAGES.mercado);
        break;
      case 27:
        setChoosingMain(true);
        break;
      case 30:
        setDialog({position:34,character:dialogs[34].character, desc:dialogs[34].desc});
        break;
      case 40:
        handleImagenEntrecortada();
        break;
      
      default:break;
    }
  }

  function chooseDress(option) {
    // setOption(option);
    console.log(option);
    setChoosing(false);
    nextDialog();
    handleImagenEntrecortada(option);
  };

  const handleMainCharacterOptions = event => {
    const chosen = dialog.options.indexOf(event.target.textContent);
    console.log(chosen,chosen===0, event.target.textContent);

    switch(dialog.position){
      case 28:
        nextDialog(chosen===0? 1:3); 
        break;
      default: break;
    }
    setChoosingMain(false);
  };

  function handleImagenEntrecortada(op){
    setHoguera(true);

    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=0;
    },500);
    
    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=1;
    },900);

    setTimeout(()=>{
      setHoguera(false);
      console.log(dialog.position);
      if(dialog.position===4){
        nextDialog(op===0? 2:5); 
      }
      if(dialog.position === 40){
        nextDialog(2); 
      }
    },1000);
  }

  return(
    <div className={styles.EdadMedia}>


      <svg className={styles.filter}>
        <filter id="alphaRed">
          <feColorMatrix mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaGreen">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaBlue">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alpha">
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </svg>
      
      <div className={styles.page} onClick={handleClick}>
          <div className={styles.imgWrap}>
            <img className={active? styles.red:''} alt="" src={backgroundImage}/>
            <img className={active? styles.green:''} alt="" src={backgroundImage}/>
            <img className={active? styles.blue:''} alt="" src={backgroundImage}/>
            
            
          </div>
          <div className={styles.butterflyDialog}>
            <img ref={butterfly} src={butterflyImage} className='butterfly' alt=""/>
            {dialog.character==='blue' && <p>{dialog.desc}</p>}
          </div>

          <div className={styles.dialog}>
            {dialog.character==='narrator' && <p>{dialog.desc}</p>}
          </div>

          <div className={styles.options}>
            {dialog.character==='main' && 
              <li>
                {dialog.options.map((text, index)=>(
                  <p onClick={handleMainCharacterOptions} key={index}>{text}</p>
                ))}
              </li>
            }
          </div>

          <div className={styles.dialog}>
            {dialog.character !=='blue' && dialog.character !== 'narrator' && dialog.character !== 'main' && <img src={IMAGES[dialog.character]}/>}
            {dialog.character !=='blue' && dialog.character !== 'narrator' && dialog.character !== 'main' && <p>{dialog.desc}</p>}
          </div>
          
          {choosing && <ChooseImages choose={chooseDress} img1="https://64.media.tumblr.com/010f82c83a644871545c7a1954ecccf8/580ffb3cf03a27f2-f4/s1280x1920/6bd7eb339cdb87b60f34360c0844de72f0e07404.png" img2="https://i.pinimg.com/originals/69/bb/a9/69bba99d507c99d25575485824a82ca8.png"/>}
          
          {hoguera && <div className={[styles.fullImage, styles.hoguera].join(' ')}>
            <img alt="" ref={imagenEntrecortada} src='https://estaticos.muyhistoria.es/uploads/images/ephemeris/5efddb845bafe8e3b11e1f8b/inquisicion_0.jpg'/>
          </div>}
      </div>


    </div>
  );
};

export default EdadMedia;

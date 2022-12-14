import React, { useEffect, useState,useRef } from 'react';
import styles from './EdadMedia.module.scss';
import { butterflyImage } from '../../App';
import ChooseImages from '../ChooseImages/ChooseImages';



function EdadMedia () {
  const butterfly = useRef(null);
  const imagenEntrecortada= useRef(null);
  const [option, setOption] = useState(null);
  const [butterflyDialog, setButterflyDialog] = useState({position:0,desc:blueDialogs[0]});
  const [narratorDialog, setNarratorDialog] = useState({position:0,desc:narratorDialogs[0]});
  const [npcDialog,setNPCDialog] = useState({position:0, character:npcDialogs[0].character, desc:npcDialogs[0].desc});
  const [active, setActive] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [hoguera, setHoguera]= useState(false);

  const blueDialogs=[
    '',
    'Uf, qué mareo...',
    '¡Oh! Ahí estás',
    'Llamas un poquito la atención así, ¿no crees?',
    'He mirado en un libro ropa apropiada. ¿Qué opinas?'
  ]
  
  const characterDialogs=[
    [],
    ['Mentir','"No necesito un hombre que hable por mí"'],
  ];
  
  const narratorDialogs=[
    '',
    'Ahora que Blue ha desaparecido, finalmente te fijas en el paisaje',
    'En el cielo hay algunas nubes por las que comienzan a aparecer los rayos del sol. El olor de la tierra aún en el ambiente y los charcos en el suelo te hace pensar que ha llovido hace poco',
    'Las calles, las ropas y la gente te hacen pensar que realmente estás en... la Edad Media',
    'Y Blue se ha llevado tus cosas, claro',
    'Paseas, sin saber realmente qué hacer',
    'El dulce olor de las garrapiñadadas te hace acercarte al mercado',
    'Algunos niños a los lejos corretean sobre los charcos. Escuchas sus risas desde ahí',
    'Se respira un buen ambiente, incluso tras la lluvia. Parece que también es Navidad en este lugar',
  
    option===1?'Ante ti encuentras un hombre alto de largos cabellos negros, vestido en ropas oscuras. Sus ojos violetas te dejan bastante claro de quién se trata'
      :'Un hombre de cabellos ondulados, rojos como el fuego y vestido en ropas caballerizas se acerca hasta ti. Al alzar la mirada ves su expresión decidida. Claramente esa persona es un noble',

  ]

  const npcDialogs=[
    {character:'',desc:''},
    {character:'guardia', desc:'Disculpe, señorita... ¿Qué hombre es su tutor?'},
    {character: (option===1)?'amnis':'lio', desc: option===1?'Esta dama está bajo mi cuidado. ¿Qué desea?':'La señorita con la que habla es mi esposa. Le sugiero tratarla con respeto'},
  ]

  useEffect(() => {
      setTimeout(()=>{
        butterfly.current.style.opacity=1;
        setActive(true);
      },2000)
      
      setTimeout(()=>{
        setButterflyDialog({position:1,desc:blueDialogs[1]});
      },3000)
    

    /** Dependencias. Si metiera glasses se ejecutaria lo de antes cada vez que cambie el estado de este */
  }, []);

  function nextButterflyDialog(){
    setButterflyDialog({position:(butterflyDialog.position+1),desc:blueDialogs[butterflyDialog.position+1]});
    
  }

  function nextNarratorDialog(){
    setNarratorDialog({position:(narratorDialog.position+1),desc:narratorDialogs[narratorDialog.position+1]});
    
  }

  function handleClick(){
    if(butterflyDialog.position<blueDialogs.length-1 && !choosing && !hoguera){
      nextButterflyDialog();
    }
    if(butterflyDialog.position===3){
      setChoosing(true);
    }
    if(butterflyDialog.position===9){
      setActive(false);
      butterfly.current.style.opacity=0;
    }

    if(narratorDialog.position < narratorDialogs.length-1 && !butterflyDialog.desc && butterflyDialog.position>0){
      nextNarratorDialog();
    }
  }

  function chooseDress(option) {
    setOption(option);
    blueDialogs.push("b̴̧̳̦͓́͂͠͠r̷͇̖̼̬̗̔͌͋̚ů̸̙̩͈͓ͅj̶̯͙͔͍̐̉̈́̿͝a̶̛͔͚͙͐͌̇ ̷̧̪̔̈͘b̷̖͍͋̒̕͝ř̸͚͇̮̐̕̕ų̴͔̭̪̃̉̑͂͠j̴̹̤̙̳͇͑̀ă̷͖̞̤͚͆̋͐́͜");
    option===1? blueDialogs.push("¿Estás segura de eso, Carla?","Bueno, allá tú","Las aventuras no se viven solas")
      :blueDialogs.push("Por el camino fácil, ¿eh?","En la ropa no se despilfarra, sí. Eso dice Jaein","Tenga un buen paseo por el pueblo, milady");
    blueDialogs.push("¡Buena suerte!",'');
    nextButterflyDialog();
    setChoosing(false);
    handleImagenEntrecortada();
  };

  function handleImagenEntrecortada(){
    setHoguera(true);

    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=0;
    },500);
    
    setTimeout(()=>{
      imagenEntrecortada.current.style.opacity=1;
    },900);

    setTimeout(()=>{
      setHoguera(false);
      setButterflyDialog({position:(6),desc:blueDialogs[6]});
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
            <img className={active? styles.red:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            <img className={active? styles.green:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            <img className={active? styles.blue:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            
            
          </div>
          <div id="dialog" className={styles.butterflyDialog}>
            <img ref={butterfly} src={butterflyImage} className='butterfly' alt=""/>
            {butterflyDialog.desc && <p>{butterflyDialog.desc}</p>}
          </div>

          <div id="dialog" className={styles.dialog}>
            {narratorDialog.desc && <p>{narratorDialog.desc}</p>}
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

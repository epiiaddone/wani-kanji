import barImage from "../assets/svgs/bar.svg";
import bearImage from "../assets/svgs/bear.svg";
import beggarImage from "../assets/svgs/beggar.svg";
import blackjackImage from "../assets/svgs/blackjack.svg";
import cactusImage from "../assets/svgs/cactus.svg";
import capeImage from "../assets/svgs/cape.svg";
import chineseImage from "../assets/svgs/chinese.svg";
import cleatImage from "../assets/svgs/cleat.svg";
import combImage from "../assets/svgs/comb.svg";
import coralImage from "../assets/svgs/coral.svg";
import creeperImage from "../assets/svgs/creeper.svg";
import deathstarImage from "../assets/svgs/death-star.svg";
import elfImage from "../assets/svgs/elf.svg";
import explosionImage from "../assets/svgs/explosion.svg";
import gladiatorImage from "../assets/svgs/gladiator.svg";
import grassImage from "../assets/svgs/grass.svg";
import gunImage from "../assets/svgs/gun.svg";
import hatImage from "../assets/svgs/hat.svg";
import hillsImage from "../assets/svgs/hills.svg";
import hornsImage from "../assets/svgs/horns.svg";
import kickImage from "../assets/svgs/kick.svg";
import leafImage from "../assets/svgs/leaf.svg";
import morningImage from "../assets/svgs/morning.svg";
import popeImage from "../assets/svgs/pope.svg";
import psychopathImage from "../assets/svgs/psychopath.svg";
import satelliteImage from "../assets/svgs/satellite.svg";
import sawImage from "../assets/svgs/saw.svg";
import spikesImage from "../assets/svgs/spikes.svg";
import springImage from "../assets/svgs/spring.svg";
import squidImage from "../assets/svgs/squid.svg";
import tofuImage from "../assets/svgs/tofu.svg";
import trashImage from "../assets/svgs/trash.svg";
import triceratopsImage from "../assets/svgs/triceratops.svg";
import vikingImage from "../assets/svgs/viking.svg";
import yurtImage from "../assets/svgs/yurt.svg";
import zombieImage from "../assets/svgs/zombie.svg";



export const RadicalSvg = ({ radicalSlug }) => {

    let imageSrc = '';
    switch (radicalSlug) {
        case "bar": imageSrc = barImage; break;
        case "bear": imageSrc = bearImage; break;
        case "beggar": imageSrc = beggarImage; break;
        case "blackjack": imageSrc = blackjackImage; break;
        case "cactus": imageSrc = cactusImage; break;
        case "cape": imageSrc = capeImage; break;
        case "chinese": imageSrc = chineseImage; break;
        case "cleat": imageSrc = cleatImage; break;
        case "comb": imageSrc = combImage; break;
        case "coral": imageSrc = coralImage; break;
        case "creeper": imageSrc = creeperImage; break;
        case "death-star": imageSrc = deathstarImage; break;
        case "elf": imageSrc = elfImage; break;
        case "explosion": imageSrc = explosionImage; break;
        case "gladiator": imageSrc = gladiatorImage; break;
        case "grass": imageSrc = grassImage; break;
        case "gun": imageSrc = gunImage; break;
        case "hat": imageSrc = hatImage; break;
        case "hills": imageSrc = hillsImage; break;
        case "horns": imageSrc = hornsImage; break;
        case "kick": imageSrc = kickImage; break;
        case "leaf": imageSrc = leafImage; break;
        case "morning": imageSrc = morningImage; break;
        case "pope": imageSrc = popeImage; break;
        case "psychopath": imageSrc = psychopathImage; break;
        case "satellite": imageSrc = satelliteImage; break;
        case "saw": imageSrc = sawImage; break;
        case "spikes": imageSrc = spikesImage; break;
        case "spring": imageSrc = springImage; break;
        case "squid": imageSrc = squidImage; break;
        case "tofu": imageSrc = tofuImage; break;
        case "trash": imageSrc = trashImage; break;
        case "triceratops": imageSrc = triceratopsImage; break;
        case "viking": imageSrc = vikingImage; break;
        case "yurt": imageSrc = yurtImage; break;
        case "zombie": imageSrc = zombieImage; break;
    }
    return <img className="radical--image" src={imageSrc} />
}
import Image, {ImageProps} from "next/image";


interface PromoBannerProps {
        
}

const PromoBanner = (props: ImageProps) => {
    return ( 
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza."
          width={0}
          height={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
          {...props}
        />
     );
}
 
export default PromoBanner;
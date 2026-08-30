type AvatarProps = {
  className?: string
  size?: 'large' | 'medium' | 'small'
}

const radiusOfSize = {
  large: '50px',
  medium: '40px',
  small: '30px'
}

export default function Avatar({className, size = 'medium'}:AvatarProps){
  const radius = radiusOfSize[size]
  return(
    <section className = {className}>
      <div
        style = {{
          width:radius,
          height:radius
        }}

        className = ' border rounded-full overflow-hidden'
      >

      </div>
    </section>
  )
}
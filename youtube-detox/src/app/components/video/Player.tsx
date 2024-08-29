import ReactPlayer from 'react-player/lazy'

const Player = ({ id }: { id: string }) => {

    return (
        <div className='md:h-[50vh] lg:h-[60vh] h-[40vh] lg:w-[80vw] w-[100vw]'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls={true} width="100%" height="100%"/>
        </div>
    );
}

export default Player
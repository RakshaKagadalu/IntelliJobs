import { useEffect } from "react"
import {useContextApp} from '../../context/contextApp'
import {StatsContainer, Loading, ChartsContainer} from '../../components'

const Stats =() => {
    const {showStats, isLoading, monthlyApplications } = useContextApp()

    useEffect(()=> {
        showStats()
        // eslint-disable-next-line
    },[])
    if(isLoading){
        return <Loading center />
    }
    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 0 && <ChartsContainer />}
        </>
    )
}

export default Stats
import {useRef, useEffect} from 'react'
import uuid from 'react-uuid'

export const useInterval = (func, delay, start) => {
	const callback = useRef()

    useEffect(() => {
		callback.current = func
    }, [func])

	useEffect(() => {
        if (start === true) {
			const id = setInterval(() => callback.current(), delay)
			return () => clearInterval(id)	
		}
	}, [delay, start])
	
}

export const genKeys = (Keys, howMany, numOfKeys) => {
    debugger
    while(numOfKeys++ < howMany)
        Keys.push(uuid())
    return Keys
}

export function spaceBar({line, lIdx, wIdx}) {
    line[lIdx].splice(wIdx,0,'\x20\u200c')
    return {
        line,
        lIdx,
        wIdx: wIdx + 1
    }
}

export function updateLine(key, line, lIdx, wIdx) {
    if (key.length === 1) 
    {
        line[lIdx].splice(wIdx+1,0,key)
    }
    return {
        line,
        lIdx,
        wIdx: wIdx + 1
    }
}

export function Backspace(obj) {
    let {
        line,
        lIdx,
        wIdx
    } = obj

    if (wIdx > -1 && line[lIdx].length > 0) 
    {
        line[lIdx].splice(wIdx-1,1)
        wIdx-- 
    }
    else {
        if (lIdx) 
        {
            line.splice(lIdx, 1)
            lIdx--
            wIdx = line[lIdx].length
        }
    }
    return {
        line,
        lIdx,
        wIdx
    }
}

export function handleEnterKey(obj) 
{
    const {line, lIdx, wIdx} = obj
    const nl = line[lIdx].slice(wIdx)
    line[lIdx] = line[lIdx].slice(0, wIdx)
    line.splice(lIdx + 1, 0, nl)
    return {
        line,
        lIdx: lIdx + 1,
        wIdx: 0
    }
}

export function handleWrap(obj)
{
    const {line, lIdx} = obj
    let lastWord = []
    let array = line[lIdx] 
    let i= array.length-1
    while (array[i] !== '\x20\u200c' && i >= 0) i--
    if (i > 0) 
        lastWord = array.splice(i, array.length - i + 1)
    line.splice(lIdx+1, 0, lastWord)
    return {
        line,
        lIdx: lIdx + 1,
        wIdx : lastWord.length,
        // Block it from async-ly re-running while the initial consition is still true
        wordWrap: false 
    }
}

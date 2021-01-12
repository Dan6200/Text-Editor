import {useRef, useEffect} from 'react'

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

export const cpyMatrix = array => array.map(elem => [...elem])

export function spaceBar(e, {line, lIdx, wIdx}) {
    e.preventDefault()
    line[lIdx].splice(wIdx+1,0,'\x20\u200c')
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx + 1
    }
}

export function updateLine(e, line, lIdx, wIdx) {
    e.preventDefault()
    if (e.key.length === 1) 
    {
        line[lIdx].splice(wIdx+1,0,e.key)
        wIdx++
    }
    return {
        newLine: line,
        newLIdx: lIdx,
        newWIdx: wIdx 
    }
}

export function Backspace(obj) {
    let {
        line: newLine,
        lIdx: newLIdx,
        wIdx: newWIdx
    } = obj

    if (newWIdx > -1 && newLine[newLIdx].length > 0) 
    {
        newLine[newLIdx].splice(newWIdx,1)
        newWIdx-- 
    }
    else {
        if (newLIdx) 
        {
            newLine.splice(newLIdx, 1)
            newLIdx--
            newWIdx = newLine[newLIdx].length
        }
    }
    return {
        newLine,
        newLIdx,
        newWIdx
    }
}

export function updateState(values, setters)
{
    const {newLine, newLIdx, newWIdx} = values
    const {setLine, setLIdx, setWIdx} = setters

    setLine(newLine)
    setLIdx(newLIdx)
    setWIdx(newWIdx)
}

export function handleEnterKey(obj) 
{
    const {line, lIdx} = obj
    line.splice(lIdx + 1, 0, [])
    return {
        newLine: line,
        newLIdx: lIdx + 1,
        newWIdx: 0
    }
}

let primes = [2]

export const primeGen = () => {
    const last = primes.length - 1
    let n = primes[last] + 1
    for(let i=0; i < last+1;)
    {
        let p = primes[i]
        if (n % p === 0)
        {
            n++
            i=0
        }
        else
            i++
    }
    primes.push(n)
    console.log(primes)
    return primes
}

export const keyGen = () => {
    const N = 5557          // prime number
    return primes.map(i => N * i)  // return the two primes product as key
}

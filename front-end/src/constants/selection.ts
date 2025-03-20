import React from 'react';

export class Selection<T, U>
{
    set : Set<T> = new Set([]);
    lastSelected : U | null = null;

    constructor(data : Iterable<T>, lastSelected : U | null = null)
    {
        this.set = new Set(data);
        this.lastSelected = lastSelected;
    }
}

export function clickSelection<T, U>
(
    e : React.MouseEvent,
    item : U,
    selection : Selection<T, U>,
    data : U[],
    keyExtractor : {(a : U) : T}
) : Selection<T, U>
{
    const ctrl = e.ctrlKey;
    const shift = e.shiftKey;

    let id = keyExtractor(item);
    selection = new Selection(selection.set, selection.lastSelected);

    if(shift && selection.lastSelected != null)
    {
        let start = data.indexOf(selection.lastSelected)
        let end = data.indexOf(item)
        if(start < 0 || end < 0){return selection;}
        
        let list = new Set([id]);
        if(start <= end)
        {
            for(let i = start; i < end; ++i)
            {
                list.add(keyExtractor(data[i]));
            }
        }else
        {
            for(let i = start; i > end; --i)
            {
                list.add(keyExtractor(data[i]));
            }
        }

        if(ctrl)
        {
            selection.set = new Set([...selection.set, ...list])
        }else
        {
            selection.set = list
        }
    }else
    if(ctrl)
    {
        if(selection.set.has(id))
        {
            selection.set.delete(id);
        }else
        {
            selection.set.add(id);
        }
        selection.lastSelected = item;
    }else
    {
        if(selection.set.size == 1 && selection.set.has(id))
        {
            selection.set = new Set([]);
        }else
        {
            selection.set = new Set([id]);
        }
        selection.lastSelected = item;
    }
    return selection;
}

export function doubleClickSelection<T, U>
(
    e : React.MouseEvent,
    item : U,
    selection : Selection<T, U>,
    data : U[],
    keyExtractor : {(a : U) : T},
    predicate : {(a : U) : boolean}
) : Selection<T, U>
{
    const ctrl = e.ctrlKey;
    const shift = e.shiftKey;

    let id = keyExtractor(item)
    selection = new Selection(selection.set, selection.lastSelected);

    let index = data.indexOf(item);
    if(index < 0){return selection;}

    let list = new Set([id]);
    
    for(let i = index + 1; i < data.length; ++i)
    {
        if(predicate(data[i]))
        {
            list.add(keyExtractor(data[i]));
        }else
        {
            break;
        }
    }

    if(shift && selection.lastSelected != null)
    {
        selection.set = new Set([...selection.set, ...list])
    }else
    if(ctrl)
    {
        selection.lastSelected = item
        selection.set = new Set([...selection.set, ...list])
    }else
    {
        selection.lastSelected = item
        selection.set = list
    }

    return selection;
}
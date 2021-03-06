import {createStore} from '../../../src/slim'

describe('event center test', () => {
    const store = createStore({
        reducers: {},
        state: {},
    })

    const toBe = (assertion, expection, result) => {
        it(assertion, () => {
            expect(expection).toBe(result)
        });
    }

    let c1 = 0
    let c2 = 0
    let c3 = 0

    const ecListener1 = (_c1, _c2) => {
        c1 += _c1
        c2 += _c2
    }

    const ecListener2 = () => {
        c3++
    }

    store.on('setInfo', ecListener1)
    store.on('setInfo', ecListener2)
    store.emit('setInfo', 3, 5)

    toBe('c1 should be 3', c1, 3)
    toBe('c2 should be 5', c2, 5)
    toBe('c3 should be 1', c3, 1)

    store.off('setInfo', ecListener2)

    store.emit('setInfo', 3, 5)
    toBe('c1 should be 6', c1, 6)
    toBe('c2 should be 10', c2, 10)
    toBe('c3 should be 1', c3, 1)

    toBe('nothing run', store.off('notExist', undefined), undefined)

    // not exist in events
    toBe('nothing run', store.off('setInfo', undefined), undefined)
})

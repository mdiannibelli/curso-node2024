const runCommand = async(args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('../../config/plugins/yargs-plugin');
    return yarg;
}

describe('Test args.plugin.ts', () => {
    
    //! Clean argvs before each test
    const originalArgvs = process.argv;
    beforeEach(() => {
        process.argv = originalArgvs;
        jest.resetModules();
    })
    
    test('should return default values', async() => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5, 
            l: 10,
            s: false, 
            n: 'table',
            d: '/outputs'
        })
    )})

    test('should return custom values', async() => {
        const argv = await runCommand(['-b', '10', '-l', '20', '-n', 'newTable', '-d', 'custom-output' ,'-s'])
        expect(argv).toEqual(expect.objectContaining({
            b: 10, 
            l: 20,
            s: true, 
            n: 'newTable',
            d: 'custom-output'
        }))
    })
})
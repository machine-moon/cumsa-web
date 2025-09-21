test("mytest - myunit", async() => {
    //const props = { params: { category: "morning" } };
    //const res = await fetch(`http://localhost:3000/api/azkar/categories/${props.params.category}`);
    const res = await fetch("http://localhost:3000/api/azkar/categories/");
    // ✅ Step 1: Check status
    expect(res.status).toBe(200);

    // ✅ Step 2: Parse JSON
    const json = await res.json();
    //console.log(data); // <-- add this to see what the API actually returned
    // ✅ Step 3: Assert shape of response
    const data = json.data;
    expect(json.ok).toBe(true);
    expect(Array.isArray(data)).toBe(true);        // response should be an array
    expect(data.length).toBeGreaterThan(0);        // array should not be empty

    // ✅ Step 4: Assert structure of first item
    const first = data[0];
    expect(first).toHaveProperty("ID");
    expect(first).toHaveProperty("TITLE");
    data.forEach(item =>{
        expect(item).toHaveProperty("ID");
        expect(item).toHaveProperty("TITLE");
        expect(item).toHaveProperty("AUDIO_URL");
        expect(item).toHaveProperty("TEXT");
        expect(typeof item.ID).toBe("number");
        expect(typeof item.TITLE).toBe("string");
        expect(typeof item.AUDIO_URL).toBe("string");
        expect(typeof item.TEXT).toBe("string");

    });


});



describe('API tests', () => {

  it('GET method, response code should be 200', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get'
    }).its('status').should('eq', 200)
  });

  it('POST method', () => {
    cy.request({
      method: 'POST',
      url: 'https://httpbin.org/post',
      body: {
        name: 'testowanie na dobry dzień'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.eq({
        name: 'testowanie na dobry dzień'
      });
    });
  });


  it('DELETE added name', () => {
    cy.request({
      method: 'POST',
      url: 'https://httpbin.org/post',
      body: {
        name: "usuwanie"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.json).to.deep.eq({
        name: "usuwanie"
      })
    }).then((response) => {
      cy.request({
        method: 'DELETE',
        url: 'https://httpbin.org/delete'
      }).then((response) =>
        expect(response.status).to.eq(200))
    }).then((response) => {
      cy.request({
        method: 'GET',
        url: 'https://httpbin.org/get'
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.have.property('name', "usuwanie")
      });
    });
  });


  it('test that user-agent set correctly', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'User-Agent': 'Test User-Agent'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers['User-Agent']).to.eq('Test User-Agent')
    });
  });

  it('test that custom header set correctly', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'Custom-Header': 'Header-Value'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers['Custom-Header']).to.eq('Header-Value')
    });
  });


  it('test sending query parameter including random parameters', () => {
    const randomParams = {
      random1: Math.random(),
      random2: Math.random()
    }
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/get',
      qs: randomParams
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.args).to.have.property('random1')
      expect(response.body.args).to.have.property('random2')
    });
  });

  it('test response body', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/json'
    }).then(response => {
      const expectedBody = {
        "slideshow": {
          "author": "Yours Truly",
          "date": "date of publication",
          "slides": [
            {
              "title": "Wake up to WonderWidgets!",
              "type": "all"
            },
            {
              "items": [
                "Why <em>WonderWidgets</em> are great",
                "Who <em>buys</em> WonderWidgets"
              ],
              "title": "Overview",
              "type": "all"
            }
          ],
          "title": "Sample Slide Show"
        }
      }
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(expectedBody)
    });
  });

  it('test header content', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers'
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json')
    });
  });

  it('test duration', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/delay/1'
    }).then(response => {
      expect(response.status).to.be.equal(200);
      expect(response.duration).to.be.lessThan(2500);
    });
  });

  it('test send cookie', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/cookies',
      headers: {
        Cookie: 'cookieName=cookieValue'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.cookies).to.deep.eq({ cookieName: 'cookieValue' })
    });
  });

  it('test that custom header set correctly', () => {
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'Custom-Header': 'Header-Value'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers['Custom-Header']).to.eq('Header-Value')
    });
  });

});
/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
// 

  async function routes(fastify, options) {
    
    // Person

    fastify.get('/person/:pid', (req, reply) => {
      const { pid } = req.params
      const queryString = `SELECT p.pid,p.idcard,p.prename,f.titlename as prefix,p.fname,p.lname,date_format(p.birth,'%Y-%m-%d') as brthdate,(CURRENT_DATE-p.birth) as age , p.rightcode,s.rightname, p.hnomoi,p.mumoi,p.subdistcodemoi,t.subdistname,p.distcodemoi,a.distname,p.provcodemoi,c.provname,p.telephoneperson as 'phone1',p.mobile as 'phone2',p.hossub,m.hosname as 'hcenter' from jhcisdb.person as p INNER JOIN jhcisdb.cright as s on p.rightcode = s.rightcode LEFT JOIN jhcisdb.ctitle as f on p.prename = f.titlecode LEFT JOIN jhcisdb.cprovince as c on p.provcodemoi = c.provcode LEFT JOIN jhcisdb.cdistrict as a on p.provcodemoi = a.provcode and p.distcodemoi = a.distcode LEFT JOIN jhcisdb.csubdistrict as t on p.provcodemoi = t.provcode and p.distcodemoi = t.distcode and p.subdistcodemoi = t.subdistcode  LEFT JOIN jhcisdb.chospital as m on p.hossub = m.hoscode where p.pid =  ${pid}`

      fastify.mysql.query(
        queryString,
        [req.params.pid],
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })
    
    // Visit
    // new visit
    fastify.post('/ovstjhcis', (req, reply) => {
      const {vn,pid,ovstdttm} = req.body
      const vn0 = Number(vn)
      const queryString = (`insert into jhcisdb.ovst(vn,pid,ovstdttm) values(${vn0},${pid},${ovstdttm})`)

      fastify.mysql.query(
        queryString,
        [req.body],
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })


    fastify.post('/ovst', (req, reply) => {
      const {vn,pid,ovstdttm} = req.body
      const vn0 = Number(vn)
      const queryString = (`insert into jhcisdb.ovst(vn,pid,ovstdttm) values(${vn0},${pid},${ovstdttm})`)

      fastify.mysql.query(
        queryString,
        [req.body],
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })

    // disease

    
    fastify.get('/icd10', (req, reply) => {
     
      const queryString = `SELECT concat(mapdisease,'_',diseasename) as icd10 FROM jhcisdb.cdisease as d  `

      fastify.mysql.query(
        queryString,
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })

    fastify.get('/icd102', (req, reply) => {
      // const { pid } = req.params
      const queryString = `SELECT * FROM jhcisdb.cdisease where diseasename like '%diabetes%'`

      fastify.mysql.query(
        queryString,
        // [req.params.pid],
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })
    
    fastify.get('/icd10/:dis', (req, reply) => {
      const { dis } = req.params
      const queryString = `SELECT * FROM jhcisdb.cdisease where diseasename like '%${dis}%'`

      fastify.mysql.query(
        queryString,
        [req.params.dis],
        function onResult(err, result) {
          reply.send(err || result)
        }
      )
      return reply
    })

  }



  module.exports = routes
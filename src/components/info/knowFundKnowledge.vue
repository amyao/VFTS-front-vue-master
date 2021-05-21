<template>
  <div class="margin-30px">
    <div class="fundList-header">基金入门常见问题</div>
    <div class="knowledge-wrapper">
      <el-collapse accordion>
        <el-collapse-item title="什么是基金？">
          <div class="knowledgeItem">1.基金的定义<p class="knowledgeItem">
            基金的本质是众筹，是一种委托关系。<br/>
            散户委托基金帮忙投资，专业的基金公司筹到钱，大家一起做投资。它能让散户以10元、100元的门槛，投资大型项目，例如银行千万级存单、上千元的茅台股票。<br/>
            作为对比，股票、债券投资就比较直接:<br/>
            股票是买入一种所有权，持有公司股份，成为股东，同时需要承担公司盈亏风险。<br/>
            债券是买一种债权，借钱的人按照约定，到期还钱和利息，风险偏小。
          </p></div>
          <div class="knowledgeItem">2.基金的运作原理<p class="knowledgeItem">
            一只基金的诞生：<br/>
            ① 基金公司寻找投资标的，形成基金产品<br/>
            ② 证监会审批，允许发行<br/>
            ③ 基金公司发行基金<br/>
            ④ 投资者投资<br/>
            ⑤ 进入封闭期（一般为1-3个月）<br/>
            ⑥ 正式运作（开始计算收益）<br/><br/>
            如果一只基金在正式运作后，投资者纷纷卖出，基金规模缩小到一定程度。或是运作到期。基金公司会通知清盘，把还剩下的钱退给大家。一般情况下，清盘的时候基本上也亏光了，一定要在清盘前换一只基金，有效止损。
          </p></div>
        </el-collapse-item>
        <el-collapse-item title="基金有哪些基本分类？">
          <div class="knowledgeItem">1.按投资对象<p class="knowledgeItem">
            ① 货币基金：余额宝就是最常见的货币基金。投资银行存单、央行票据、银行存款等，风险低，收益低，可以随时买卖。<br/>
            ② 股票基金：是市面上最常见的基金类型。用80%以上的钱投资股票，风险高，收益高。<br/>
            ③ 债券基金：80%以上的钱投资债券，风险低，收益比货币基金略高。一般买入的是国债、地方债、企业债等。比较特殊的是可转债，买入后能从债券转为股票，风险略大。<br/>
            ④ 混合基金：可以同时买入银行存单、债券、股票，混在一起成为一只基金。<br/>
            ⑤ 指数基金：根据已知指数的股票比例，选股投资，组成一只基金。是股票基金的一种。能有效避免基金公司投资股票像在“大海捞针”，投资者投资起来更放心。
            常见的指数有沪深300指数、中证500指数、医药100指数、纳斯达克100指数……指数可以包含大盘、某一行业的股票，甚至是海外股票。
          </p></div>
          <div class="knowledgeItem">2.按运作模式<p class="knowledgeItem">
            ① 封闭式基金：基金开始运作后，新的投资者无法直接申请购买，只能到证券交易所里买二手的。基金规模不会增加。<br/>
            ② 开放式基金：基金开始运作后，新老投资者都能直接向基金公司申请购买。基金整体规模会随着投资者的申购而增加。<br/>
          </p></div>
          <div class="knowledgeItem">3.按购买场所<p class="knowledgeItem">
            ① 场内基金：需要开户，在证券交易所里买卖基金。<br/>
            ② ETF基金：全称交易型开放式指数基金，是最典型的指数基金，也是最典型的场内基金，只能开户买卖。<br/>
            ③ 场外基金：不能在证券交易所里进行买卖，只向基金公司申请购买，或者申请赎回。<br/>
            ④ 混合基金：可以同时买入银行存单、债券、股票，混在一起成为一只基金。<br/><br/>
            PS: 第三方基金交易平台购买的都是开放式基金，场外基金。
          </p></div>
        </el-collapse-item>
        <el-collapse-item title="一只基金要看什么指标？">
          <div class="knowledgeItem">1.历史收益: 主要观察基金3个月、最近一年以及最近3年收益情况。分别对应短期、中期和长期收益。<p class="knowledgeItem">
            每一只基金都有业绩比较基准，但标准线大都很低，甚至低于市场平均水平。所以一般会用沪深300指数作为对比。当基金的中期和长期收益都比沪深300强时，可以认定是一只不错的基金。<br/>
            PS:<br/>
            债券基金无法与沪深300对比，但长期收益（2年以上）7%以上算不错。<br/>
            货币基金无法与沪深300对比，但7日年化收益2%以上算不错。<br/>
          </p></div>
          <div class="knowledgeItem">2.净值: 所有基金的初始净值都是1。<p class="knowledgeItem">
            ① 货币基金的净值始终为1，涨幅主要看7日年化收益和万份收益。<br/>
            ② 其他基金根据业绩的涨幅，净值随之叠加。<br/>
            例如，正式运作后第一天涨了5%，则净值为1.05。净值不是股价，并非越低越好，它只代表该基金从发行到现在业绩的涨幅情况。<br/>
          </p></div>
          <div class="knowledgeItem">3.规模: 规模在2亿以上为正常，过低则有清盘危险。<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem">4.持仓: 主要针对股票基金而言，持仓前十的分布，会很大程度上影响风险与收益。<p class="knowledgeItem">
            当前十重仓占比过大时，基金波动概率更大。<br/>
            当持仓过于集中在某行业时，基金潜在风险较大。<br/>
          </p></div>
          <div class="knowledgeItem">5.基金经理: 任职时长和任期收益是考察重点。<p class="knowledgeItem">
            如果一只基金经常更换基金经理，则其收益很有可能不稳定。<br/>
            如果基金经理的任期收益为负数，则基金未来业绩大概率很差。<br/>
          </p></div>
        </el-collapse-item>
        <el-collapse-item title="关于基金的买前须知">
          <div class="knowledgeItem">1.交易时间: T日，即交易日，指的是可以在证券交易所交易的日子。<p class="knowledgeItem">
            周一至周五开盘交易，节假日休息。<br/>
            开盘时间：早上9:30—11:30 下午13:00—15:00。每天15:00之后算下一个交易日。<br/>
            ① T+0，即当天交易，当天结算。<br/>
            ② T+1，即当天确认交易，第二天结算。<br/>
            ③ T+2，即当天确认交易，隔天结算。<br/>
          </p></div>
          <div class="knowledgeItem">2.申购、认购<p class="knowledgeItem">
            ① 认购：是新基金的发布流程，发生在第一次向社会公开募集资金的时候。时间一般会持续一周，火爆一些的基金一天就会卖空。<br/>
            ② 申购：向基金公司申请购买基金。大部分基金都是T+1模式，当天确认买卖份额，第二天正式买入、开始跑收益，第三天能看到收益结果。<br/>
            PS：本模拟交易平台只支持申购<br/>
          </p></div>
          <div class="knowledgeItem">3.赎回: 向基金公司赎回基金，大部分都是T+2，即当天确认，隔天到账。基金赎回大都需要经过银行二次确认，才能到账。货币基金赎回是T+0，赎回资金秒到账，最方便。<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem">4.在哪里购买？<p class="knowledgeItem">
            现在买基金的途径已经很丰富，手机上动动手指都能交易。<br/>
            区别在于手续费，需要综合考虑自己买基金的操作习惯，寻找收费相对低的平台即可。<br/>
            PS：本模拟交易平台参考的支付宝平台买入费率<br/>
          </p></div>
          <div class="knowledgeItem">5.运作费率：项目比较琐碎，变化幅度较大，投资时应首选费率低的平台。<p class="knowledgeItem">
            管理费+托管费（不打折）：相对于支付给基金公司的工资，每天固定扣取。<br/>
            认购费（不打折）：新发基金才有。<br/>
            申购费/手续费（可打折）：买基金的费用，一般为1.5%，第三方平台通常会打1折。<br/>
            赎回费（分级收费）：通常分3~4档，基金持有时间越久费率越低。<br/>
            PS：<br/>
            A类基金：只收申购费，赎回按持有时间收持有费，适合长期（一年以上）投资。<br/>
            C类基金：不收申购费，但有销售服务费，适合短线投资。<br/>
          </p></div>
        </el-collapse-item>
        <el-collapse-item title="如何迈出基金投资的第一步？">
          <div class="knowledgeItem">投资基金不是在银行存钱。 收益越高风险越高！ 在迈出第一步之前，心里必须有数，不能跟风乱跑、人云亦云。<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem">1.进行规划<p class="knowledgeItem">
            基金投资就像跑一场马拉松，需要耗费较长的周期，和一个清晰的目标。<br/>
            首先必须做好长期战斗的准备。至少要有1~2年的收益预期，一切往长远做打算，能帮你减少很多市场波动带来的烦恼。<br/>
            其次是投资的目标。买基金之前，先问问自己，赚钱的目的是什么？是想赚养老的钱？首付的钱？孩子的学费？或是只想跑赢通货膨胀？<br/>
            对于“终点线”的预期会深刻地影响你的风险承受能力。<br/>
            如果你买基金只是为了跑赢通胀，实现保值，那么就不要玩短线、别买波动大的基金，应该关注更加稳定的债券基金、货币基金，以及智能存款。<br/>
            如果你买基金是为了存款增值，自己吃喝不愁，房贷车贷也不成问题，那么可以试着关注高收益的基金，短期波动大点也没关系。<br/>
          </p></div>
          <div class="knowledgeItem"> 2.找准方向<p class="knowledgeItem">
            以下给那些想要实现资产增值，无惧短期波动，只想挣大钱的朋友。<br/>
            当前市场，投资什么最赚钱？<br/><br/>
            股票。<br/><br/>
            转换到基金投资领域，是股票基金以及混合基金。它们的本质，都是买入一篮子上市公司股票。<br/>
            股票赚钱的本质逻辑就是：上市公司赚钱，持有股票的股东才能赚钱。<br/>
            如何选出一堆持续赚钱的公司股票呢？<br/>
            方法一：买指数基金，指数跟踪的是市场平均收益。只要国家经济在增长，市场平均收益必然是正向的。长期收益可达6%~8%。<br/>
            方法二：是让专业的基金经理帮我们买好股票，我们坐享其成。优秀的基金经理长期收益超15%不是问题。<br/>
          </p></div>
        </el-collapse-item>
        <el-collapse-item title="参考基金干货连接">
          <div class="knowledgeItem2" onclick="window.open('https://mp.weixin.qq.com/s/_vl2xGTAYrYkgFMI7y80iQ')">
            1、基金全攻略：一篇万字干货彻底讲透基金，不仅有理论还有我的实战结果<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem2" onclick="window.open('https://mp.weixin.qq.com/s/MEJ6brm9xRarIODADLbTXg')">
            2、基金如何选：帮大家彻底搞懂怎么选出优质基金<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem2" onclick="window.open('https://mp.weixin.qq.com/s/O_theHWuUwgNDgNGK6oi3g')">
            3、基金怎么买：90%的人不懂，基金买入时机极其重要，这篇文章帮你彻底搞懂<p class="knowledgeItem">
          </p></div>
          <div class="knowledgeItem2" onclick="window.open('https://mp.weixin.qq.com/s/CuVE2jEHVs22VQjN1P2rSQ')">
            4、基金怎么卖：手把手教你基金怎么卖，才能赚100%收益。<p class="knowledgeItem">
          </p></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.fundList-header {
  font-size: 15px;
  color: #3479ff;
  font-weight: 700;
  border-left: 3px solid #3479ff;
  padding-left: 7px;
  text-align: left;
}

.margin-30px {
  margin: 30px;
  text-align: left;
}

.knowledgeItem {
  margin-left: 30px;
  margin-right: 30px;
}

.knowledgeItem2 {
  margin-left: 30px;
  margin-right: 30px;
  text-decoration: underline;
}

.knowledge-wrapper {
  margin: 30px;
}
</style>

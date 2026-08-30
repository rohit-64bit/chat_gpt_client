/*
shows chat history in grid format with chat title and recent msg short details 
allows user to click on chat title to open chat in chat window
allows user to start a new chat with new title
*/

import { TbPencilPlus } from "react-icons/tb";
import { CiFolderOn } from "react-icons/ci";
import React from 'react'

const NewChat = () => {
  return (
    <div className='chat-card bg-white/90 hover:bg-white flex items-center justify-center text-black'>
      <div className='text-sm font-medium flex gap-1 items-center justify-center -ml-4'><TbPencilPlus fontSize={20} /> New Chat</div>
    </div>
  )
}

const ChatCard = ({ title, recentMsg }) => {

  return (
    <div className='chat-card bg-black/40 hover:bg-black/70 flex flex-col items-start justify-start text-white gap-2'>

      <div className='flex flex-col gap-1 items-start justify-start w-full h-full p-2'>
        {/* truncates after first line */}
        <div className='font-medium truncate w-full'>{title}</div>
        {/* truncated when needed */}
        <div className='text-xs text-gray-500 truncate w-full h-full'>{recentMsg}</div>
      </div>

      <div className="w-max flex gap-1 rounded-full bg-white text-black px-1.5 py-0.5 text-xs font-normal">
        <CiFolderOn fontSize={15} /> Research
      </div>
    </div>
  )

}

const Home = () => {
  return (
    <div className='p-10 h-screen'>

      <h1 className='text-2xl font-medium'>Welcome to the Chat App</h1>

      <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 h-[90%] overflow-y-auto'>

        <NewChat />

        <ChatCard title="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, eos doloremque. Modi dolore praesentium, pariatur minima quas esse odio iste dolorum in aut quaerat corrupti saepe cupiditate velit blanditiis labore?
Dolorem harum quaerat eius eveniet illo dignissimos quas, eos rerum! Perspiciatis exercitationem maxime deleniti esse reiciendis animi similique consequuntur? Quas repellendus natus ex nesciunt error aliquam enim veniam sequi nisi.
Expedita laudantium nulla voluptatem quisquam sed aliquam, soluta possimus neque placeat? Est illo quam obcaecati dicta dolorem tenetur distinctio. Non necessitatibus facilis quas ea, mollitia beatae suscipit maxime harum quaerat.
Aperiam accusamus voluptates voluptatum cum voluptate quisquam, necessitatibus rerum recusandae excepturi quibusdam. Harum voluptatum provident aliquam sit voluptas! Provident autem ab quo illo tenetur laudantium vero aut. Molestias, dicta nobis!
Iste natus eligendi repudiandae deserunt voluptatum voluptas incidunt eius ipsam! Amet rerum distinctio modi similique repellendus. Inventore ut sapiente est blanditiis nulla fugit ad velit quae, fugiat et. Quisquam, iste!
Ratione, debitis velit aperiam odit assumenda tempora officiis mollitia atque, reprehenderit, laudantium dicta aspernatur non praesentium eius eos! Fugiat eligendi beatae quis at adipisci libero excepturi. Quia ad maiores unde.
Quae, vitae culpa libero soluta minus dolores, voluptas maiores, amet quos hic aliquid necessitatibus in. Quae repellat, amet minus cupiditate animi voluptate incidunt aperiam, distinctio, repudiandae dolores quia est vero?
Cupiditate suscipit quo ipsa? Eaque est placeat consequuntur nostrum. Libero dolores reprehenderit amet reiciendis veniam error ipsum, rem modi esse. Enim nulla laboriosam aut ipsam fugit dolor, odit facere architecto.
Est maxime enim expedita ipsa, blanditiis esse, quos atque cumque voluptas dignissimos corporis architecto praesentium repudiandae deleniti quas illo aut temporibus! Ipsa cum perspiciatis fuga mollitia! Iure adipisci ab natus?
Totam doloremque illo sit. Eius laborum repudiandae provident recusandae reprehenderit atque ipsam magni dicta quae maxime? Soluta ea sit alias, itaque vitae dignissimos odit, voluptates, et nihil consequatur suscipit ut.
Blanditiis, laborum? Expedita, nemo consectetur earum officia quisquam atque error corporis aperiam, quas optio voluptatum dolore odio sed repudiandae! Esse harum, ab velit nihil error pariatur magni aperiam molestias id?
Ratione, explicabo! Similique vero velit natus nemo neque! Saepe commodi sit sed ab reprehenderit quo amet, aliquid autem natus odit nam pariatur velit magni voluptatem aperiam sequi omnis reiciendis quidem.
Consectetur nulla cum pariatur non. Doloremque voluptate, neque delectus sint quod quae dolorem, unde vitae nam, praesentium ratione iste. Ea quod, assumenda sit accusamus impedit beatae? Rem sint temporibus numquam.
Perferendis eius pariatur repellendus ipsam natus, aspernatur quia modi inventore odio dolores quod voluptatem ex temporibus tempora voluptas veritatis earum doloribus nulla dolorem aperiam nihil quo incidunt blanditiis est? Suscipit.
Laborum soluta ducimus, accusamus sint temporibus, similique laboriosam distinctio explicabo tenetur officia nihil laudantium minima. Earum rerum molestias numquam obcaecati officia. Quibusdam eos reprehenderit consectetur perspiciatis harum quisquam impedit illo.
Aspernatur repudiandae illo ipsam nam commodi iusto dolorum rerum quisquam veritatis tenetur ad quis ipsum molestiae ipsa saepe reprehenderit aut nostrum, nesciunt qui. Ad libero perspiciatis hic, numquam eaque saepe!
Voluptatum officia velit ex distinctio quasi, quas obcaecati assumenda id incidunt expedita vel recusandae architecto soluta ullam. Accusantium molestiae id expedita, quibusdam recusandae doloribus iste molestias laboriosam porro adipisci eum!
Ab adipisci illo a eius alias, similique, veniam debitis nulla modi magnam quos consequuntur fugiat nam nostrum, reiciendis quis eligendi ut autem laboriosam assumenda numquam praesentium minus sunt! Veritatis, magni!
Magnam consectetur sapiente odit fugiat molestias saepe quos dolor obcaecati ut provident omnis earum praesentium assumenda, odio unde rem asperiores quasi aperiam voluptate! Minima voluptatem nihil ad dignissimos at reiciendis!
Consequuntur id omnis quos illum libero ipsum odit asperiores veniam, atque fuga nulla eum animi quaerat modi eos rerum, voluptatem nam veritatis obcaecati illo similique quae soluta optio non? Delectus.
Magni rem quia asperiores maiores, magnam dicta adipisci voluptatum, dolore tempora sunt sint. Exercitationem consequatur sunt nisi autem asperiores repellat aperiam laboriosam nesciunt dignissimos, nemo quisquam cumque vitae dolor? Laudantium!
Sit natus ipsam eveniet dolores aspernatur sunt corrupti reiciendis, distinctio perspiciatis ad amet in ea fugiat eum cumque, a expedita consequuntur aut quisquam consequatur quis, culpa molestiae mollitia repudiandae. Atque?
Reprehenderit eaque facere eveniet odio explicabo vero quam omnis aliquid sed dolores mollitia provident ratione qui voluptate, sequi at ut quibusdam quasi assumenda iusto blanditiis culpa numquam alias nobis! Deserunt?
Molestiae enim laborum mollitia esse doloremque, quibusdam eligendi explicabo eaque culpa laudantium iure similique odio nisi. Commodi, ducimus aperiam quas eius totam tempore a sunt odio ex eveniet quisquam officiis?
Maxime quo similique quidem repudiandae minima exercitationem assumenda corrupti velit hic numquam iusto debitis architecto quod ipsum aut consectetur facere, quam iure molestiae expedita accusamus! Ex vero debitis earum optio!
Reiciendis magnam aliquid, ipsam totam aliquam labore adipisci architecto ea, dicta corrupti, et provident veniam voluptatum consectetur praesentium! Consequatur cupiditate architecto sint harum praesentium assumenda, voluptatibus saepe facere explicabo quod.
Mollitia magnam nulla cupiditate aut delectus obcaecati nihil voluptate aliquam in amet accusamus aspernatur quam, necessitatibus ab. Possimus odit adipisci, molestias placeat rerum, aut excepturi rem neque, facere mollitia necessitatibus.
Est, unde molestiae delectus incidunt modi velit qui odio tempora voluptas quas ea, consequuntur soluta a! Magni eos quam, asperiores cupiditate rerum, nam facere harum incidunt exercitationem saepe eveniet reiciendis!
Harum, accusantium? Qui, repellat esse dolore molestiae magni quisquam repudiandae. Saepe, nemo, eligendi alias repellat aliquid voluptatem molestias possimus facilis esse consequatur repellendus voluptatibus, et pariatur repudiandae aspernatur assumenda. Laudantium.
Maiores officia quibusdam accusantium quia fuga expedita, laborum pariatur blanditiis. Eos dolore saepe nostrum nemo, ratione officiis numquam ut consequuntur sed earum, reprehenderit natus dolor, ea voluptas et distinctio fuga." recentMsg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, eos doloremque. Modi dolore praesentium, pariatur minima quas esse odio iste dolorum in aut quaerat corrupti saepe cupiditate velit blanditiis labore?
Dolorem harum quaerat eius eveniet illo dignissimos quas, eos rerum! Perspiciatis exercitationem maxime deleniti esse reiciendis animi similique consequuntur? Quas repellendus natus ex nesciunt error aliquam enim veniam sequi nisi.
Expedita laudantium nulla voluptatem quisquam sed aliquam, soluta possimus neque placeat? Est illo quam obcaecati dicta dolorem tenetur distinctio. Non necessitatibus facilis quas ea, mollitia beatae suscipit maxime harum quaerat.
Aperiam accusamus voluptates voluptatum cum voluptate quisquam, necessitatibus rerum recusandae excepturi quibusdam. Harum voluptatum provident aliquam sit voluptas! Provident autem ab quo illo tenetur laudantium vero aut. Molestias, dicta nobis!
Iste natus eligendi repudiandae deserunt voluptatum voluptas incidunt eius ipsam! Amet rerum distinctio modi similique repellendus. Inventore ut sapiente est blanditiis nulla fugit ad velit quae, fugiat et. Quisquam, iste!
Ratione, debitis velit aperiam odit assumenda tempora officiis mollitia atque, reprehenderit, laudantium dicta aspernatur non praesentium eius eos! Fugiat eligendi beatae quis at adipisci libero excepturi. Quia ad maiores unde.
Quae, vitae culpa libero soluta minus dolores, voluptas maiores, amet quos hic aliquid necessitatibus in. Quae repellat, amet minus cupiditate animi voluptate incidunt aperiam, distinctio, repudiandae dolores quia est vero?
Cupiditate suscipit quo ipsa? Eaque est placeat consequuntur nostrum. Libero dolores reprehenderit amet reiciendis veniam error ipsum, rem modi esse. Enim nulla laboriosam aut ipsam fugit dolor, odit facere architecto.
Est maxime enim expedita ipsa, blanditiis esse, quos atque cumque voluptas dignissimos corporis architecto praesentium repudiandae deleniti quas illo aut temporibus! Ipsa cum perspiciatis fuga mollitia! Iure adipisci ab natus?
Totam doloremque illo sit. Eius laborum repudiandae provident recusandae reprehenderit atque ipsam magni dicta quae maxime? Soluta ea sit alias, itaque vitae dignissimos odit, voluptates, et nihil consequatur suscipit ut.
Blanditiis, laborum? Expedita, nemo consectetur earum officia quisquam atque error corporis aperiam, quas optio voluptatum dolore odio sed repudiandae! Esse harum, ab velit nihil error pariatur magni aperiam molestias id?
Ratione, explicabo! Similique vero velit natus nemo neque! Saepe commodi sit sed ab reprehenderit quo amet, aliquid autem natus odit nam pariatur velit magni voluptatem aperiam sequi omnis reiciendis quidem.
Consectetur nulla cum pariatur non. Doloremque voluptate, neque delectus sint quod quae dolorem, unde vitae nam, praesentium ratione iste. Ea quod, assumenda sit accusamus impedit beatae? Rem sint temporibus numquam.
Perferendis eius pariatur repellendus ipsam natus, aspernatur quia modi inventore odio dolores quod voluptatem ex temporibus tempora voluptas veritatis earum doloribus nulla dolorem aperiam nihil quo incidunt blanditiis est? Suscipit.
Laborum soluta ducimus, accusamus sint temporibus, similique laboriosam distinctio explicabo tenetur officia nihil laudantium minima. Earum rerum molestias numquam obcaecati officia. Quibusdam eos reprehenderit consectetur perspiciatis harum quisquam impedit illo.
Aspernatur repudiandae illo ipsam nam commodi iusto dolorum rerum quisquam veritatis tenetur ad quis ipsum molestiae ipsa saepe reprehenderit aut nostrum, nesciunt qui. Ad libero perspiciatis hic, numquam eaque saepe!
Voluptatum officia velit ex distinctio quasi, quas obcaecati assumenda id incidunt expedita vel recusandae architecto soluta ullam. Accusantium molestiae id expedita, quibusdam recusandae doloribus iste molestias laboriosam porro adipisci eum!
Ab adipisci illo a eius alias, similique, veniam debitis nulla modi magnam quos consequuntur fugiat nam nostrum, reiciendis quis eligendi ut autem laboriosam assumenda numquam praesentium minus sunt! Veritatis, magni!
Magnam consectetur sapiente odit fugiat molestias saepe quos dolor obcaecati ut provident omnis earum praesentium assumenda, odio unde rem asperiores quasi aperiam voluptate! Minima voluptatem nihil ad dignissimos at reiciendis!
Consequuntur id omnis quos illum libero ipsum odit asperiores veniam, atque fuga nulla eum animi quaerat modi eos rerum, voluptatem nam veritatis obcaecati illo similique quae soluta optio non? Delectus.
Magni rem quia asperiores maiores, magnam dicta adipisci voluptatum, dolore tempora sunt sint. Exercitationem consequatur sunt nisi autem asperiores repellat aperiam laboriosam nesciunt dignissimos, nemo quisquam cumque vitae dolor? Laudantium!
Sit natus ipsam eveniet dolores aspernatur sunt corrupti reiciendis, distinctio perspiciatis ad amet in ea fugiat eum cumque, a expedita consequuntur aut quisquam consequatur quis, culpa molestiae mollitia repudiandae. Atque?
Reprehenderit eaque facere eveniet odio explicabo vero quam omnis aliquid sed dolores mollitia provident ratione qui voluptate, sequi at ut quibusdam quasi assumenda iusto blanditiis culpa numquam alias nobis! Deserunt?
Molestiae enim laborum mollitia esse doloremque, quibusdam eligendi explicabo eaque culpa laudantium iure similique odio nisi. Commodi, ducimus aperiam quas eius totam tempore a sunt odio ex eveniet quisquam officiis?
Maxime quo similique quidem repudiandae minima exercitationem assumenda corrupti velit hic numquam iusto debitis architecto quod ipsum aut consectetur facere, quam iure molestiae expedita accusamus! Ex vero debitis earum optio!
Reiciendis magnam aliquid, ipsam totam aliquam labore adipisci architecto ea, dicta corrupti, et provident veniam voluptatum consectetur praesentium! Consequatur cupiditate architecto sint harum praesentium assumenda, voluptatibus saepe facere explicabo quod.
Mollitia magnam nulla cupiditate aut delectus obcaecati nihil voluptate aliquam in amet accusamus aspernatur quam, necessitatibus ab. Possimus odit adipisci, molestias placeat rerum, aut excepturi rem neque, facere mollitia necessitatibus.
Est, unde molestiae delectus incidunt modi velit qui odio tempora voluptas quas ea, consequuntur soluta a! Magni eos quam, asperiores cupiditate rerum, nam facere harum incidunt exercitationem saepe eveniet reiciendis!
Harum, accusantium? Qui, repellat esse dolore molestiae magni quisquam repudiandae. Saepe, nemo, eligendi alias repellat aliquid voluptatem molestias possimus facilis esse consequatur repellendus voluptatibus, et pariatur repudiandae aspernatur assumenda. Laudantium.
Maiores officia quibusdam accusantium quia fuga expedita, laborum pariatur blanditiis. Eos dolore saepe nostrum nemo, ratione officiis numquam ut consequuntur sed earum, reprehenderit natus dolor, ea voluptas et distinctio fuga." />
        
        <ChatCard title="Chat 2" recentMsg="This is the recent message for Chat 2" />
        
        <ChatCard title="Chat 3" recentMsg="This is the recent message for Chat 3" />

      </div>

    </div>
  )
}

export default Home
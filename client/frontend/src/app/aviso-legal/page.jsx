"use client";
import dynamic from "next/dynamic";
import { useLanguageStore } from "../../store/language/language.store";

const AvisoLegal = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="mx-5 mb-4 md:mx-[38.5px] lg:w-3/4 lg:mx-auto">
      <h1 className="font-bold text-primaryGreen text-2xl text-center py-4 md:text-3xl md:py-6 lg:text-left">
        Aviso Legal
      </h1>
      <div className="flex flex-col gap-8 items-center h-[244.5vh] md:h-[140.5vh] lg:h-[183vh]">
        {language === "es" ? (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            architecto quibusdam repellat tempore. Quos harum rem fugit aut
            enim. Soluta delectus, quod modi aut ipsa suscipit, dolorem nulla
            expedita explicabo pariatur ad culpa libero necessitatibus adipisci
            reprehenderit in vel nostrum excepturi eligendi impedit veniam.
            Accusantium et accusamus ex veniam rerum eveniet quasi perspiciatis,
            asperiores minus possimus, reprehenderit, eligendi neque. Tempora
            accusantium, accusamus aliquam enim eius ab mollitia esse
            necessitatibus adipisci, sapiente distinctio nulla ullam quaerat
            cupiditate inventore nihil placeat in, ratione minus velit dolore
            numquam. Ut non nostrum unde minus incidunt, eligendi vel ipsum
            sapiente suscipit possimus tempora deserunt doloribus nihil maiores
            aspernatur reprehenderit dicta ad dignissimos dolore cupiditate?
            Commodi consectetur, tempore voluptatem id voluptate impedit
            veritatis explicabo a officia iste, dicta et quibusdam quis
            molestiae? Corrupti necessitatibus veritatis harum commodi maiores
            autem non eveniet voluptas dolorem, mollitia at earum suscipit vel?
            Optio inventore, ipsam vel esse non magni pariatur nulla iste
            deserunt corporis possimus laborum, neque iure porro, doloremque
            amet? Sed doloremque neque odit unde magni quo harum, soluta
            commodi? Omnis distinctio eaque quae culpa aliquid deserunt
            consequuntur earum! Reiciendis veniam, a, odit asperiores mollitia
            eos quo non soluta placeat corporis at corrupti est, temporibus in.
            Error cumque consectetur asperiores amet dolorem sint nostrum
            voluptates nobis, animi dolores excepturi culpa eius repellendus quo
            temporibus vel accusamus alias eaque et vero autem voluptatibus
            numquam vitae sequi. Tenetur sed exercitationem qui velit, quidem
            asperiores ipsum modi repellendus commodi ratione officia eius
            doloribus voluptate, dolore veniam esse corporis, necessitatibus
            autem ipsa placeat?
          </p>
        ) : (
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
            corporis reiciendis dolores saepe enim dolor molestias quidem
            architecto provident mollitia consectetur, repellat laudantium quasi
            recusandae eaque error ipsam optio ex placeat debitis corrupti
            doloremque. Asperiores saepe voluptatibus necessitatibus impedit
            mollitia dolorum eum, iure accusamus, reiciendis doloremque ullam
            quidem libero id accusantium expedita voluptatem doloribus! Est,
            ratione doloremque dolores blanditiis praesentium consequuntur
            possimus in provident consequatur laudantium non eaque nemo id
            exercitationem quo similique unde! Earum harum cupiditate
            repellendus quisquam, voluptas quibusdam corrupti beatae sapiente
            unde, inventore eligendi quidem accusamus voluptates, explicabo
            minima autem aspernatur cum facilis? Eaque, eum laboriosam! Optio
            deserunt amet magni corporis fugit quae harum atque nam. Doloribus
            ipsam nemo ipsum soluta autem praesentium blanditiis perspiciatis
            officiis iste, quos vitae possimus facilis, ratione dignissimos
            laborum vero ex ipsa maiores iusto earum. Optio explicabo doloremque
            voluptatibus praesentium quisquam quia repellendus, consequatur
            nulla dolorum animi suscipit reiciendis pariatur recusandae ut
            reprehenderit ullam voluptas laudantium sunt debitis unde deserunt
            dicta minus! Pariatur aliquid placeat corporis atque, tenetur ut
            laboriosam eveniet? Aliquam, necessitatibus! Est maxime odio sed
            itaque asperiores cumque, recusandae pariatur? Recusandae odio
            perferendis libero fugit reiciendis quia obcaecati cupiditate error!
            At eius veniam aspernatur veritatis dolorem aliquam quasi.
            Distinctio explicabo earum corporis. Dolores porro hic impedit
            consequuntur vero officiis ipsa quibusdam aperiam ex, veritatis
            error adipisci magni, molestias optio doloribus in eum vel
            consequatur! Fuga quasi asperiores modi natus deleniti officiis,
            obcaecati animi vitae nihil, ex tempora. Totam veritatis eos dolorum
            mollitia reiciendis deserunt. Doloremque tempore unde saepe aperiam!
            Laudantium.
          </p>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AvisoLegal), { ssr: false });

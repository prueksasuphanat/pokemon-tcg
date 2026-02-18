<script setup>
import { computed, onMounted } from "vue";
import { useCardStore } from "~/stores/card";

const cardStore = useCardStore();

const cards = ref();
const setOptions = ref([]);
const rarityOptions = ref([]);
const typeOptions = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const countData = ref(0);

const nameValue = ref("");
const setValue = ref("");
const rarityValue = ref("");
const typeValue = ref("");

const selectedCards = ref([]);

const totalCard = computed(() => {
  let total = 0;

  selectedCards.value.forEach((card) => {
    total += card.qty;
  });

  return total;
});

const totalPrice = computed(() => {
  let total = 0;

  selectedCards.value.forEach((card) => {
    total += card.totalPrice;
  });

  return total;
});

const isLoading = ref(false);

// API
const select = async () => {
  isLoading.value = true;

  cards.value = [];

  if (setValue.value == "All") setValue.value = "";
  if (rarityValue.value == "All") rarityValue.value = "";
  if (typeValue.value == "All") typeValue.value = "";

  if (
    cardStore.type !== typeValue.value ||
    cardStore.rarity !== rarityValue.value ||
    cardStore.set !== setValue.value ||
    cardStore.name !== nameValue.value
  ) {
    currentPage.value = 1;
  }

  const response = await cardStore.select(
    currentPage.value,
    20,
    nameValue.value.trim(),
    setValue.value,
    rarityValue.value,
    typeValue.value
  );

  cards.value = response.data;

  totalPage.value = Math.floor(response.totalCount / 20);

  countData.value = response.count;

  cards.value.forEach((card) => {
    card.stock = 20;
  });

  isLoading.value = false;
};

// MODAL
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
// END MODAL

const addCard = (data) => {
  let card = {
    id: data.id,
    name: data.name,
    qty: 1,
    price: data.cardmarket?.prices.averageSellPrice,
    totalPrice: data.cardmarket?.prices.averageSellPrice,
    pic: data.images.small,
  };

  const existingCard = selectedCards.value.find(
    (selectedCard) => selectedCard.id === card.id
  );

  if (existingCard) {
    existingCard.qty += 1;
    existingCard.totalPrice += card.totalPrice;
  } else {
    selectedCards.value.push(card);
  }
};

const plusQty = (id) => {
  const card = selectedCards.value.find((card) => card.id === id);

  if (card) {
    card.qty += 1;
    card.totalPrice += card.price;
  }
};

const minusQty = (id) => {
  const card = selectedCards.value.find((card) => card.id === id);

  if (card.qty > 1) {
    card.qty -= 1;
    card.totalPrice -= card.price;

    return;
  }

  // card == 0 deleted
  const emptyCardIndex = selectedCards.value.findIndex(
    (card) => card.id === id
  );

  selectedCards.value.splice(emptyCardIndex, 1);
};

const clearAll = () => {
  selectedCards.value = [];
};

const numberFormat = (value) => {
  if (!value) {
    return "0";
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

onMounted(async () => {
  isLoading.value = true;
  
  try {
    // เรียก API แบบ parallel เพื่อความเร็ว
    const [setsData, raritiesData, typesData] = await Promise.all([
      cardStore.getSet(),
      cardStore.getRarity(),
      cardStore.getType()
    ]);
    
    // Process sets
    if (setsData?.data) {
      setOptions.value.push({ name: "All", code: "" });
      setsData.data.forEach((data) => {
        setOptions.value.push({ name: data.name, code: data.id });
      });
    }
    
    // Process rarities
    if (raritiesData?.data) {
      rarityOptions.value.push({ name: "All", code: "" });
      raritiesData.data.forEach((data, index) => {
        rarityOptions.value.push({ name: data, code: index });
      });
    }
    
    // Process types
    if (typesData?.data) {
      typeOptions.value.push({ name: "All", code: "" });
      typesData.data.forEach((data, index) => {
        typeOptions.value.push({ name: data, code: index });
      });
    }
    
    // Load initial cards
    await select();
  } catch (error) {
    console.error('Error loading initial data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <!-- modal -->
  <ModalCart title="Cart" v-model:visible="showModal">
    <template #title>
      <p
        @click="clearAll()"
        class="text-[#ABBBC2] text-[12px] leading-[15.6px] font-[400] underline cursor-pointer"
      >
        Clear all
      </p>
    </template>
    <template #content>
      <div class="mt-[20px] flex flex-col justify-between h-full">
        <div class="overflow-y-auto max-h-[83vh]">
          <table class="w-full">
            <thead class="sticky top-0 z-10 bg-[#1F1D2B]">
              <tr
                class="text-[14px] font-[400] leading-[19.6px] h-[25px] text-left"
              >
                <th class="">Item</th>
                <th class="w-full">Qty</th>
                <th class="">Price</th>
              </tr>
              <tr>
                <th>
                  <div class="h-[1px] w-full bg-[#FFFFFF] opacity-[8%]"></div>
                </th>
                <th>
                  <div class="h-[1px] w-full bg-[#FFFFFF] opacity-[8%]"></div>
                </th>
                <th>
                  <div class="h-[1px] w-full bg-[#FFFFFF] opacity-[8%]"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(row, index) in selectedCards" :key="index">
                <tr class="text-left text-[12px] align-top">
                  <td class="pt-[23px] align-top w-auto h-auto">
                    <img class="w-[44px] h-[60px]" :src="row.pic" />
                  </td>
                  <td class="pt-[23px] align-top">
                    <p class="text-[12px] font-[500] leading-[18px]">
                      {{ row.name }}
                    </p>
                    <p
                      class="text-[12px] text-[#ABBBC2] font-[400] leading-[15.6px]"
                    >
                      $ {{ numberFormat(row.price.toFixed(2)) }}
                    </p>
                  </td>
                  <td
                    class="text-[12px] font-[500] leading-[18px] pt-[23px] align-top"
                  >
                    $ {{ numberFormat(row.totalPrice.toFixed(2)) }}
                  </td>
                </tr>
                <tr class="text-left text-[12px]">
                  <td class="pt-[10px]">
                    <button
                      @click="minusQty(row.id)"
                      class="cursor-pointer w-[54px] h-[54px] text-[18px] leading-[32.4px] font-[500] bg-[#363946] hover:bg-[#4c4f5a] transition rounded-[8px] flex justify-center items-center"
                    >
                      -
                    </button>
                  </td>
                  <td class="pt-[10px] px-[8px]">
                    <button
                      class="w-full h-[54px] text-[18px] leading-[32.4px] font-[500] bg-[#363946] rounded-[8px] flex justify-center items-center"
                    >
                      {{ row.qty }}
                    </button>
                  </td>
                  <td class="pt-[10px]">
                    <button
                      @click="plusQty(row.id)"
                      class="cursor-pointer w-[54px] h-[54px] text-[18px] leading-[32.4px] font-[500] bg-[#363946] hover:bg-[#4c4f5a] transition rounded-[8px] flex justify-center items-center"
                    >
                      +
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div
          class="bg-[#1F1D2B] pr-[29px] pl-[24px] pb-[48px] w-full sm:w-1/3 h-auto mt-auto absolute bottom-0 right-0 z-[51]"
        >
          <div class="pt-[24px] flex justify-between items-center">
            <p class="text-[12px] font-[400] leading-[15.6px] text-[#ABBBC2]">
              Total card amount
            </p>
            <p class="text-[16px] font-[500] leading-[22.4px]">
              {{ totalCard }}
            </p>
          </div>
          <div class="py-[16px] flex justify-between items-center">
            <p class="text-[12px] font-[400] leading-[15.6px] text-[#ABBBC2]">
              Total price
            </p>
            <p class="text-[16px] font-[500] leading-[22.4px]">
              $ {{ numberFormat(totalPrice.toFixed(2)) }}
            </p>
          </div>
          <button
            class="shadow-[0px_8px_24px_rgba(234,124,105,0.3)] cursor-pointer w-full h-[54px] text-[12px] leading-[21.6px] font-[500] bg-[#EA7C69] shadow-[0px_8px_24px_rgba(234,124,105,0.3)] rounded-[8px] flex justify-center items-center"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </template>
  </ModalCart>

  <!-- header -->
  <div
    class="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto] items-center md:gap-4"
  >
    <h1
      class="col-span-2 justify-self-start text-[26px] leading-[36.4px] my-[30px] cursor-pointer order-1 md:col-span-1"
    >
      Pokemon market
    </h1>

    <div
      class="col-span-3 mb-[24px] md:mb-0 md:col-span-1 md:flex order-3 md:gap-4 md:justify-end md:order-2"
    >
      <CustomSearchInput
        @update:searchText="nameValue = $event"
        @change="select()"
        placeholder="Search by Name"
      ></CustomSearchInput>
    </div>

    <div
      @click="openModal"
      class="justify-self-end md:col-span-1 md:flex md:justify-end w-fit order-2 md:order-3"
    >
      <div
        class="bg-[#EA7C69] shadow-[0px_8px_24px_rgba(234,124,105,0.3)] p-[8px] rounded-[8px] cursor-pointer"
      >
        <img src="@/assets/icons/ShoppingBag.svg" alt="" />
      </div>
    </div>
  </div>

  <div class="h-[1px] w-full bg-[#FFFFFF] opacity-[8%]"></div>

  <div
    class="grid grid-cols-[auto_1fr] max-[500px]:grid-cols-1 mb-[24px] items-center"
  >
    <h1 class="text-[18px] leading-[25.2px] my-[24px] w-fit">Choose Card</h1>
    <div
      class="max-[500px]:justify-start flex justify-self-end justify-end items-center gap-[16px] w-full"
    >
      <PrimevueDropdown
        @change="(setValue = $event.value.name), select()"
        :options="setOptions"
        placeholder="Set"
      ></PrimevueDropdown>
      <PrimevueDropdown
        @change="(rarityValue = $event.value.name), select()"
        :options="rarityOptions"
        placeholder="Rarity"
      ></PrimevueDropdown>
      <PrimevueDropdown
        @change="(typeValue = $event.value.name), select()"
        :options="typeOptions"
        placeholder="Type"
      ></PrimevueDropdown>
    </div>
  </div>

  <!-- cards -->
  <div
    v-if="isLoading"
    class="flex justify-center items-center h-[280px]"
  >
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA7C69]"></div>
      <p class="mt-4 text-[#ABBBC2]">Loading cards...</p>
    </div>
  </div>

  <div
    v-else-if="countData === 0"
    class="flex justify-center items-center h-[280px]"
  >
    <div class="text-center">
      <p class="text-[18px] text-[#ABBBC2]">No cards found</p>
      <p class="text-[14px] text-[#ABBBC2] mt-2">Try adjusting your filters</p>
    </div>
  </div>

  <div
    v-else
    class="flex flex-wrap gap-x-[16px] gap-y-[24px] justify-start min-h-[280px] max-[407px]:w-full max-[407px]:justify-center max-[598px]:justify-center"
  >
    <div
      v-if="countData !== 0"
      v-for="(card, index) in cards"
      :key="index"
      class="max-[407px]:w-full"
    >
      <img
        class="mt-0 w-[102px] h-[142px] rounded-[5px] z-10 max-[407px]:h-auto max-[407px]:max-w-[194.73px] max-[407px]:w-full max-[407px]:justify-center mx-auto"
        :src="card.images.small"
        alt=""
      />

      <div
        class="relative flex flex-col items-center bg-[#1F1D2B] gap-[8px] w-fit rounded-b-[16px] max-[407px]:w-full max-[407px]:px-[16px]"
      >
        <div
          class="h-[40.42px] absolute top-[-40.42px] -z-1 w-full bg-[#1F1D2B] rounded-t-[16px]"
        ></div>
        <span
          class="font-[500] text-[12px] leading-[18px] pt-[14px] max-[407px]:text-[14px] max-[407px]:leading-[21px]"
        >
          {{ card.name }}
        </span>

        <div
          class="flex gap-[8px] text-[#ABBBC2] text-[12px] font-[400] leading-[15.6px] max-[407px]:text-[14px] max-[407px]:leading-[18.2px]"
        >
          <span class="">
            $ {{ numberFormat(card.cardmarket?.prices.averageSellPrice) }}
          </span>
          <span
            class="w-[4px] h-[4px] bg-[#474651] rounded-full justify-self-center mt-[8px]"
          ></span>
          <span>{{ card.stock }} Cards</span>
        </div>
        <button
          @click="addCard(card)"
          :class="{
            'bg-[#312f3c] hover:bg-[#4c4f5a] cursor-pointer': card.stock > 0,
            'bg-[#2E303E] cursor-not-allowed text-white opacity-50':
              card.stock <= 0,
          }"
          class="flex gap-[8px] items-center text-[12px] font-[500] leading-[21.6px] transition px-[27px] py-[8px] rounded-[8px] mx-[16px] mb-[16px] max-[407px]:text-[14px] max-[407px]:leading-[25.2px] max-[407px]:w-full max-[407px]:justify-center"
        >
          <img
            class="w-[14px] h-[14px]"
            src="@/assets/icons/ShoppingBag.svg"
            alt=""
          />
          Add to cart
        </button>
      </div>
    </div>

    <div class="w-full flex justify-center pb-[24px]">
      <CustomPaginator
        v-show="!isLoading && countData !== 0"
        @update:currentPage="(currentPage = $event), select()"
        :currentPage="currentPage"
        :totalPages="totalPage"
      ></CustomPaginator>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 600;
}
</style>

module pinkmammoth::first_nft {
    use std::option;
    use std::signer;
    use std::string;
    use aptos_std::debug;
    use aptos_std::string_utils;
    use aptos_framework::account;
    use aptos_framework::account::SignerCapability;
    use aptos_framework::event;
    use aptos_framework::object;
    use aptos_framework::object::Object;
    use aptos_framework::randomness;

    use aptos_token_objects::collection;
    use aptos_token_objects::royalty;
    use aptos_token_objects::token;
    use aptos_token_objects::token::Token;

    // ERROR CODE
    const ERROR_NOWNER: u64 = 1;

    const ResourceAccountSeed: vector<u8> = b"pink mammoth";

    const CollectionDescription: vector<u8> = b"Where the wild world of NFTs comes alive in pink!";

    const CollectionName: vector<u8> = b"pink mammoth";

    const CollectionURI: vector<u8> = b"ipfs://QmPabLPoqybiinoyLXbLU2EW1B4hyd6d5FzoheoXcEfFP3";

    const TokenURI: vector<u8> = b"ipfs://QmTLwSA7qhtNAsem7qrDScmmCaCCUnutXHWbVsVHFvSuc8/";

    const TokenPrefix: vector<u8> = b"pink #";
    const MAX_TOKEN_AMOUNT:u64 = 110;

    struct ResourceCap has key {
        cap: SignerCapability
    }

    struct CollectionRefsStore has key {
        mutator_ref: collection::MutatorRef
    }

    struct TokenRefsStore has key {
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        extend_ref: object::ExtendRef,
        transfer_ref: option::Option<object::TransferRef>
    }

    struct Description has key {
        content: string::String
    }

    // NFT price
    // struct Price has key {
    //     price: u64
    // }

    #[event]
    struct MintEvent has drop, store {
        owner: address,
        token_id: address,
        content: string::String
    }

    #[event]
    struct SetDescriptionEvent has drop, store {
        owner: address,
        token_id: address,
        old_content: string::String,
        new_content: string::String
    }

    #[event]
    struct BurnEvent has drop, store {
        owner: address,
        token_id: address,
        content: string::String
    }


    fun init_module(sender: &signer) {
        let (resource_signer, resource_cap) = account::create_resource_account(
            sender,
            ResourceAccountSeed
        );

        move_to(
            &resource_signer,
            ResourceCap {
                cap: resource_cap
            }
        );

        let collection_cref = collection::create_unlimited_collection(
            &resource_signer,
            string::utf8(CollectionDescription),
            string::utf8(CollectionName),
            option::some(royalty::create(5, 100, signer::address_of(sender))),
            string::utf8(CollectionURI)
        );

        let collection_signer = object::generate_signer(&collection_cref);

        let mutator_ref = collection::generate_mutator_ref(&collection_cref);

        move_to(
            &collection_signer,
            CollectionRefsStore {
                mutator_ref
            }
        );
    }

    #[randomness]
    entry fun mint(
        sender: &signer,
        content: string::String
    ) acquires ResourceCap {
        fatch_nft(sender,content)
    }

     fun fatch_nft(
        sender: &signer,
        content: string::String
    ) acquires ResourceCap {
        let resource_cap = &borrow_global<ResourceCap>(
            account::create_resource_address(
                &@pinkmammoth,
                ResourceAccountSeed
            )
        ).cap;

        let resource_signer = &account::create_signer_with_capability(
            resource_cap
        );
        // ipfs://QmTLwSA7qhtNAsem7qrDScmmCaCCUnutXHWbVsVHFvSuc8/
        let url = string::utf8(TokenURI);

        let token_cref = token::create_numbered_token(
            resource_signer,
            string::utf8(CollectionName),
            string::utf8(CollectionDescription),
            string::utf8(TokenPrefix),
            string::utf8(b""),
            option::none(),
            string::utf8(b""),
        );
        // b"ipfs://QmTLwSA7qhtNAsem7qrDScmmCaCCUnutXHWbVsVHFvSuc8/ + index + .png

        let id = token::index<Token>(object::object_from_constructor_ref(&token_cref));
        if (id > MAX_TOKEN_AMOUNT){
            // [0,111)
            id = randomness::u64_range(0,111);
            debug::print(&id)
        };
        string::append(&mut url, string_utils::to_string(&id));
        string::append(&mut url, string::utf8(b".png"));

        let token_signer = object::generate_signer(&token_cref);

        // create token_mutator_ref
        let token_mutator_ref = token::generate_mutator_ref(&token_cref);

        token::set_uri(&token_mutator_ref, url);

        // create generate_burn_ref
        let token_burn_ref = token::generate_burn_ref(&token_cref);

        // if you want stop transfer ( must save transfer_ref
        // let transfer_ref = object::generate_transfer_ref(&token_cref);
        // object::disable_ungated_transfer(&transfer_ref);

        move_to(
            &token_signer,
            TokenRefsStore {
                mutator_ref: token_mutator_ref,
                burn_ref: token_burn_ref,
                extend_ref: object::generate_extend_ref(&token_cref),
                transfer_ref: option::none()
            }
        );

        move_to(
            &token_signer,
            Description {
                content
            }
        );

        event::emit(
            MintEvent {
                owner: signer::address_of(sender),
                token_id: object::address_from_constructor_ref(&token_cref),
                content
            }
        );

        object::transfer(
            resource_signer,
            object::object_from_constructor_ref<Token>(&token_cref),
            signer::address_of(sender),
        )
    }


    entry fun burn(
        sender: &signer,
        object: Object<Description>
    ) acquires TokenRefsStore, Description {
        assert!(object::is_owner(object, signer::address_of(sender)), ERROR_NOWNER);
        let TokenRefsStore {
            mutator_ref: _,
            burn_ref,
            extend_ref: _,
            transfer_ref: _
        } = move_from<TokenRefsStore>(object::object_address(&object));

        let Description {
            content
        } = move_from<Description>(object::object_address(&object));

        event::emit(
            BurnEvent {
                owner: object::owner(object),
                token_id: object::object_address(&object),
                content
            }
        );

        token::burn(burn_ref);
    }

    entry fun set_content(
        sender: &signer,
        object: Object<Description>,
        content: string::String
    ) acquires Description {
        let old_content = borrow_content(signer::address_of(sender), object).content;
        event::emit(
            SetDescriptionEvent {
                owner: object::owner(object),
                token_id: object::object_address(&object),
                old_content,
                new_content: content
            }
        );
        borrow_mut_content(signer::address_of(sender), object).content = content;
    }

    // #[view]
    // public fun get_price(token_address: address):u64{
    //     //TODO
    // }

    // inline fun borrow_price(owner:address):u64{
    // }

    #[view]
    public fun get_content(object: Object<Description>): string::String acquires Description {
        borrow_global<Description>(object::object_address(&object)).content
    }

    inline fun borrow_content(owner: address, object: Object<Description>): &Description {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global<Description>(object::object_address(&object))
    }

    inline fun borrow_mut_content(owner: address, object: Object<Description>): &mut Description {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global_mut<Description>(object::object_address(&object))
    }


    // #[test_only]
    // public fun init_for_test(sender: &signer) {
    //     init_module(sender)
    // }
//     #[test(sender=@pinkmammoth)]
//     fun test_mint(sender:&signer) acquires ResourceCap {
//         debug::print(&string::utf8(b"test"));
//         init_module(sender);
//         let content = string::utf8(b"coustom string");
//
//         mint(sender,content)
//     }






    // ------------------------
    struct Mint_Obj{
        mint_id:vector<u8>
    }
    fun vec(vec:vector<u8>){
        let obj = Mint_Obj{
            mint_id:vec,
        };
        debug::print(&obj.mint_id);


    }

    // // ------------------
    // struct Foo has drop{ x: u64, y: bool }
    //
    // #[test]
    // fun example() {
    //
    //
    //     let foo = Foo { x: 3, y: true };
    //     // debug::print_stack_trace();
    //     let foo_ref: &Foo = &foo;
    //     let _y: bool = foo_ref.y;          // reading a field via a reference to the struct
    //     let x_ref: &u64 = &foo.x;
    //     // debug::print_stack_trace();
    //
    //     debug::print(x_ref); // success
    //
    //     // debug::print_stack_trace();
    //     let x_ref_mut: &mut u64 = &mut foo.x;
    //     // debug::print_stack_trace();
    //     // debug::print(x_ref); // success
    //     *x_ref_mut = 42;            // modifying a field via a mutable reference
    //     x_ref = freeze(x_ref_mut);
    //
    //     // debug::print_stack_trace();
    //     debug::print(x_ref); // error
    //     // debug::print_stack_trace();
    //     debug::print(x_ref_mut); // sucess
    //     // debug::print_stack_trace();
    // }

    // --------------------------
    // #[test]
    // fun sum(){
    //     let sum = 0;
    //     let n = 10;
    //     // let i = 0;
    //     for (i in 0..n) {
    //         sum = sum + i;
    //         debug::print(&i);
    //     };
    //     //----------------
    //     let foo = Foo {
    //         x: 3,
    //         y: true
    //     };
    //     let foo_ref: &Foo = &foo;
    //     let y: bool = foo_ref.y;          // reading a field via a reference to the struct
    //     // debug::print(&y);
    //     let x_ref: &u64 = &foo.x;
    //     debug::print(x_ref);
    //     let x_ref_mut: &mut u64 = &mut foo.x;
    //     *x_ref_mut = 42;            // modifying a field via a mutable reference
    //
    //     // debug::print(x_ref);
    //     // debug::print(x_ref_mut);
    // }

}